import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function githubAuthenticate(prevState: any, formData: FormData) {
  try {
    await signIn("github");
  } catch (error) {
    if (error instanceof AuthError) {
      return "GiiHub log in failed";
    }
    throw error;
  }
}
