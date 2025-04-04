import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function UploadImageForm() {
  async function uploadImage(formData: FormData): Promise<any> {
    "use server";
    const imageFile = formData.get("image") as File;
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    revalidatePath("/");
    return blob;
  }

  return (
    <form action={uploadImage}>
      <label htmlFor="image">Image</label>
      <input type="file" id="image" name="image" required />
      <button>Upload</button>
    </form>
  );
}

// import { put } from "@vercel/blob";
// import { revalidatePath } from "next/cache";

// export async function UploadImageForm() {
//   async function uploadImage(formData: FormData): Promise<void> {
//     "use server";
//     const imageFile = formData.get("image") as File;
//     if (!imageFile) {
//       console.error("No file selected");
//       return;
//     }

//     try {
//       const blob = await put(imageFile.name, imageFile, {
//         access: "public",
//       });
//       console.log("Uploaded blob:", blob);
//       revalidatePath("/");
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   }

//   return (
//     <form action={uploadImage}>
//       <label htmlFor="image">Image</label>
//       <input type="file" id="image" name="image" required />
//       <button type="submit">Upload</button>
//     </form>
//   );
// }
