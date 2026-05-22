#!/usr/bin/env python3
"""Proxy localhost:PORT -> remote Ollama tunnel (for Codex CLI sandbox bypass)"""
import sys, http.server, urllib.request, urllib.error

TUNNEL = sys.argv[1].rstrip('/')
PORT   = int(sys.argv[2]) if len(sys.argv) > 2 else 11434

class Handler(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a): pass

    def proxy(self):
        length = int(self.headers.get('Content-Length', 0))
        body   = self.rfile.read(length) if length else None
        url    = TUNNEL + self.path
        req    = urllib.request.Request(url, data=body, method=self.command)
        for k, v in self.headers.items():
            if k.lower() not in ('host', 'content-length', 'transfer-encoding'):
                req.add_header(k, v)
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                self.send_response(r.status)
                for k, v in r.headers.items():
                    if k.lower() != 'transfer-encoding':
                        self.send_header(k, v)
                self.end_headers()
                self.wfile.write(r.read())
        except urllib.error.HTTPError as e:
            self.send_response(e.code); self.end_headers()
            self.wfile.write(e.read())
        except Exception as e:
            self.send_response(502); self.end_headers()
            self.wfile.write(str(e).encode())

    do_GET = do_POST = do_PUT = do_DELETE = do_HEAD = do_OPTIONS = proxy

if __name__ == '__main__':
    srv = http.server.HTTPServer(('127.0.0.1', PORT), Handler)
    print(f'[proxy] 127.0.0.1:{PORT} → {TUNNEL}', flush=True)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass
