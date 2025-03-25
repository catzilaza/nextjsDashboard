import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { string } from "zod";

// const key: CryptoKey | Uint8Array<ArrayBufferLike> | any = ""; //| KeyObject | JWK
const key: CryptoKey | Uint8Array<ArrayBufferLike> | any =
  new TextEncoder().encode(process.env.SECRET_SESSION_KEY); //| KeyObject | JWK

type cookieType = {
  name: string;
  options: {};
  duration: number;
};

const cookie: cookieType = {
  name: "session",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session: any) {
  try {
    const { payload }: { payload: any } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function CreateSession(userId: any) {
  const expires: any = new Date(Date.now() + cookie.duration);
  const session: any = await encrypt({ userId, expires });

  (await cookies()).set(cookie.name, session, { ...cookie.options, expires });
  redirect("/dashboard");
}

export async function VerifySession() {
  const cookie: cookieType | undefined | any = (await cookies()).get(
    cookies.name
  )?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { userId: session.userId };
}

export async function deleteSession() {
  (await cookies()).delete(cookie.name);
  redirect("/login");
}
