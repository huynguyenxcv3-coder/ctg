"""Capy.ai provider implementation."""

from __future__ import annotations

from collections.abc import Iterator
from typing import Any

from core.anthropic import append_request_id, iter_provider_stream_error_sse_events
from core.anthropic.native_sse_block_policy import (
    NativeSseBlockPolicyState,
    parse_native_sse_event,
    transform_native_sse_block_event,
)
from providers.anthropic_messages import AnthropicMessagesTransport, StreamChunkMode
from providers.base import ProviderConfig

_ANTHROPIC_VERSION = "2023-06-01"


class CapyProvider(AnthropicMessagesTransport):
    """Capy.ai provider using the native Anthropic-compatible messages API."""

    stream_chunk_mode: StreamChunkMode = "event"

    def __init__(self, config: ProviderConfig):
        from . import CAPY_DEFAULT_BASE
        super().__init__(
            config,
            provider_name="CAPY",
            default_base_url=CAPY_DEFAULT_BASE,
        )

    def _build_request_body(
        self, request: Any, thinking_enabled: bool | None = None
    ) -> dict:
        """Internal helper for tests and direct request dispatch."""
        # Capy.ai expects standard Anthropic messages format
        body = super()._build_request_body(request, thinking_enabled=thinking_enabled)

        # Ensure model name is stripped of provider prefix if passed
        if "model" in body and "/" in body["model"]:
            body["model"] = body["model"].split("/", 1)[1]

        return body

    def _request_headers(self) -> dict[str, str]:
        """Return Capy.ai's Anthropic-compatible messages headers."""
        return {
            "Accept": "text/event-stream",
            "Authorization": f"Bearer {self._api_key}",
            "Content-Type": "application/json",
            "anthropic-version": _ANTHROPIC_VERSION,
        }

    def _new_stream_state(self, request: Any, *, thinking_enabled: bool) -> Any:
        """Create per-stream state for thinking block filtering."""
        return NativeSseBlockPolicyState()

    def _transform_stream_event(
        self,
        event: str,
        state: Any,
        *,
        thinking_enabled: bool,
    ) -> str | None:
        """Drop provider-specific terminal noise and hidden thinking events."""
        if isinstance(state, NativeSseBlockPolicyState):
            event_name, _data_text = parse_native_sse_event(event)
            if state.message_stopped:
                return None
            if event_name == "message_stop":
                state.message_stopped = True

        if isinstance(state, NativeSseBlockPolicyState):
            return transform_native_sse_block_event(
                event, state, thinking_enabled=thinking_enabled
            )
        return event

    def _format_error_message(self, base_message: str, request_id: str | None) -> str:
        """Format error message."""
        return append_request_id(base_message, request_id)

    def _emit_error_events(
        self,
        *,
        request: Any,
        input_tokens: int,
        error_message: str,
        sent_any_event: bool,
    ) -> Iterator[str]:
        """Emit the Anthropic SSE error shape expected by Claude clients."""
        yield from iter_provider_stream_error_sse_events(
            request=request,
            input_tokens=input_tokens,
            error_message=error_message,
            sent_any_event=sent_any_event,
            log_raw_sse_events=self._config.log_raw_sse_events,
        )
