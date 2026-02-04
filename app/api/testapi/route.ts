"use server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // อ่าน body ที่ส่งมาจาก Postman
  const body = await req.json();

  if (!req.body) {
    return NextResponse.json(
      { error: "Request body is null" },
      { status: 400 },
    );
  }

  // สมมติว่ามีการตรวจสอบ user สำเร็จ
  const token = "sample-access-token-123";
  const refreshToken = "sample-refresh-token-456";

  const userInfo = {
    email: "e@email.com",
    role: "user",
  };

  //   return NextResponse.json({ message: "File uploaded successfully" });

  return NextResponse.json(
    {
      token,
      refreshToken,
      userInfo,
    },
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    },
  );
}
