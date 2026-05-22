"""Tests for Capy.ai native Anthropic Messages provider."""

from contextlib import asynccontextmanager
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from api.models.anthropic import (
    Message,
    MessagesRequest,
)
from config.constants import ANTHROPIC_DEFAULT_MAX_OUTPUT_TOKENS
from providers.base import ProviderConfig
from providers.capy import (
    CAPY_DEFAULT_BASE,
    CapyProvider,
)


@pytest.fixture
def capy_config():
    return ProviderConfig(
        api_key="test_capy_key",
        base_url=CAPY_DEFAULT_BASE,
        rate_limit=10,
        rate_window=60,
        enable_thinking=True,
    )


@pytest.fixture(autouse=True)
def mock_rate_limiter():
    @asynccontextmanager
    async def _slot():
        yield

    with patch("providers.anthropic_messages.GlobalRateLimiter") as mock:
        instance = mock.get_scoped_instance.return_value

        async def _passthrough(fn, *args, **kwargs):
            return await fn(*args, **kwargs)

        instance.execute_with_retry = AsyncMock(side_effect=_passthrough)
        instance.concurrency_slot.side_effect = _slot
        yield instance


@pytest.fixture
def capy_provider(capy_config):
    return CapyProvider(capy_config)


def test_default_base_url():
    assert CAPY_DEFAULT_BASE == "https://capy.ai/api/v1"


def test_init(capy_config):
    with patch("httpx.AsyncClient") as mock_client:
        provider = CapyProvider(capy_config)
    assert provider._api_key == "test_capy_key"
    assert provider._base_url == "https://capy.ai/api/v1"
    assert mock_client.called


def test_request_headers_includes_bearer_auth(capy_provider):
    h = capy_provider._request_headers()
    assert h["Authorization"] == "Bearer test_capy_key"
    assert h["Content-Type"] == "application/json"
    assert h["Accept"] == "text/event-stream"
    assert h["anthropic-version"] == "2023-06-01"


def test_build_request_body_native_shape(capy_provider):
    request = MessagesRequest(
        model="claude-3-5-sonnet",
        max_tokens=100,
        messages=[Message(role="user", content="Hello")],
        system="S",
    )
    body = capy_provider._build_request_body(request)
    assert body["model"] == "claude-3-5-sonnet"
    assert body["stream"] is True
    assert body["messages"][0]["role"] == "user"
    assert body["messages"][0]["content"] in (
        "Hello",
        [{"type": "text", "text": "Hello"}],
    )
    assert body["system"] == "S"
    assert body["max_tokens"] == 100


def test_build_request_body_strips_provider_prefix(capy_provider):
    request = MessagesRequest(
        model="capy/claude-3-5-sonnet",
        max_tokens=100,
        messages=[Message(role="user", content="Hello")],
    )
    body = capy_provider._build_request_body(request)
    assert body["model"] == "claude-3-5-sonnet"


def test_build_request_body_default_max_tokens(capy_provider):
    request = MessagesRequest(
        model="m",
        messages=[Message(role="user", content="x")],
    )
    body = capy_provider._build_request_body(request)
    assert body["max_tokens"] == ANTHROPIC_DEFAULT_MAX_OUTPUT_TOKENS


@pytest.mark.asyncio
async def test_stream_uses_post_messages_path(capy_provider):
    request = MessagesRequest(
        model="m",
        messages=[Message(role="user", content="hi")],
    )
    called: dict[str, str] = {}

    async def fake_send(request, *args, **kwargs):
        called["path"] = request.url.path
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.is_closed = False
        mock_resp.raise_for_status = lambda: None

        async def aiter():
            if False:  # pragma: no cover
                yield ""

        mock_resp.aiter_lines = aiter
        mock_resp.aclose = AsyncMock()
        return mock_resp

    capy_provider._client.send = fake_send
    _ = [x async for x in capy_provider.stream_response(request, request_id="r1")]

    assert called["path"] == "/api/v1/messages"
