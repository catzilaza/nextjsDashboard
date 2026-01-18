import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // try {
  //   // ดึงข้อมูลจาก body ของ request
  //   const { email, password } = await request.json();

  //   // โค้ดดาต้าเบส เพื่อหาค่า email password

  //   // ตัวอย่างตรวจสอบ (mock)
  //   if (email === "test@example.com" && password === "123456") {
  //     return NextResponse.json(
  //       { success: true, message: "Login success", user: { email } },
  //       { status: 200 }
  //     );
  //   }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 },
  );
  // } catch (error: any) {
  //   return NextResponse.json(
  //     { success: false, message: "Server error", error: error.message },
  //     { status: 500 }
  //   );
  // }
}
