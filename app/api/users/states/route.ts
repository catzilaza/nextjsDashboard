import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const states: any = searchParams.get("states");

  if (!request.body) {
    return NextResponse.json(
      { error: "Request body is null" },
      { status: 400 }
    );
  }
  return NextResponse.json(JSON.stringify(states), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
