import { put } from "@vercel/blob";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename: any = searchParams.get("filename");

  if (!request.body) {
    return NextResponse.json(
      { error: "Request body is null" },
      { status: 400 }
    );
  }

  const reader = request.body?.getReader();
  const chunks: Uint8Array[] = [];
  if (reader) {
    let result = await reader.read();
    while (!result.done) {
      chunks.push(result.value);
      result = await reader.read();
    }
  }
  const bodyBuffer = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
  const blob = await put(filename, bodyBuffer, {
    access: "public",
  });

  return NextResponse.json(blob);
}
