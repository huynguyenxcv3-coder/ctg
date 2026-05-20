"""Capy.ai provider - Anthropic-compatible native transport."""

CAPY_DEFAULT_BASE = "https://capy.ai/api/v1"

from .client import CapyProvider

__all__ = ["CAPY_DEFAULT_BASE", "CapyProvider"]
