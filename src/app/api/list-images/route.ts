import { listImagesInFolder } from '@/lib/api';
import { NextResponse } from 'next/server';

// GET /api/list-images?folder=/img/Blog1_2
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder');
  if (!folder) {
    return NextResponse.json([], { status: 400 });
  }
  // Nur Zugriff auf public/img/... erlauben
  if (!folder.startsWith('/img/')) {
    return NextResponse.json([], { status: 403 });
  }
  try {
    const files = await listImagesInFolder(folder);
    return NextResponse.json(files);
  } catch {
    return NextResponse.json([], { status: 404 });
  }
}
