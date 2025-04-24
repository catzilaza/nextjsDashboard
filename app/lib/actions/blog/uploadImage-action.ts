import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function uploadImage(formData: FormData): Promise<any> {
  "use server";
  const imageFile = formData.get("image") as File;
  const blob = await put(imageFile.name, imageFile, {
    access: "public",
  });
  revalidatePath("/");
  return blob;
}
