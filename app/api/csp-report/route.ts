import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Keep lightweight to avoid UX impact. Logs can be added here later.
  await request.text();
  return new NextResponse(null, { status: 204 });
}
