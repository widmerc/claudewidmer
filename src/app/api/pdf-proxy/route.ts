import { NextResponse } from 'next/server';

// Simple proxy to fetch remote PDFs server-side and stream them to the client.
// Usage: /api/pdf-proxy?url=<encoded-url>

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
  }

  // Allow only http(s)
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return NextResponse.json({ error: 'Only http(s) URLs are supported' }, { status: 400 });
  }

  // Optional: Basic host allowlist to avoid open proxy abuse.
  // You can extend this list or remove it if you intentionally want broader support.
  const allowedHosts = [
    'www.dropbox.com',
    'dl.dropboxusercontent.com',
    'www.dropboxusercontent.com',
    'drive.google.com',
  ];

  // If you want to allow any host, skip this check. For safety we allow common hosts only.
  if (!allowedHosts.includes(parsed.host)) {
    // Allow localhost and same-origin during development
    if (!parsed.hostname.endsWith('localhost') && parsed.hostname !== request.headers.get('host')) {
      return NextResponse.json({ error: 'Host not allowed by proxy' }, { status: 403 });
    }
  }

  // For Dropbox share links, users often paste the "www.dropbox.com/s/.." share link which serves an HTML preview.
  // To force direct download/serve of the file, Dropbox supports the `dl=1` query param. If present, leave it,
  // otherwise add it to ensure we get the raw file content.
  if (parsed.host.includes('dropbox.com')) {
    // Force dl=1 for Dropbox links so we always get the raw file (not an HTML preview)
    parsed.searchParams.set('dl', '1');
    // Reconstruct url string — parsed.toString() will include the changed searchParams
  }

  // Fetch remote resource server-side
  try {
    const res = await fetch(parsed.toString(), {
      method: 'GET',
      // no-cache to ensure latest
      headers: { 'Cache-Control': 'no-cache' },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream responded ${res.status}` }, { status: 502 });
    }

    // Copy relevant headers; force application/pdf for Dropbox or when upstream
    // does not provide a PDF content-type (prevents browser download behavior)
    let contentType = res.headers.get('content-type') || '';
    const contentLength = res.headers.get('content-length') || undefined;

    if (parsed.host.includes('dropbox.com') || !/pdf/i.test(contentType)) {
      contentType = 'application/pdf';
    }

    const response = new NextResponse(res.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Let the browser decide how to handle (inline) — don't force attachment
        'Content-Disposition': 'inline',
        ...(contentLength ? { 'Content-Length': contentLength } : {}),
      },
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 502 });
  }
}
