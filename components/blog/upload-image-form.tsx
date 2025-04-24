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
    <section className="border p-8 rounded-lg flex-col justify-center items-center">
      <div className="border p-8 rounded-lg">
        <h1 className="capitalize text-2xl font-semibold mb-4">
          Upload Image Form
        </h1>
      </div>

      <div className="border p-8 rounded-lg">
        <form action={uploadImage}>
          <div className="border p-8 rounded-lg">
            <label htmlFor="image">Image</label>
            <input type="file" id="image" name="image" required />
            <br />
          </div>
          <div className="border p-8 rounded-lg">
            <label htmlFor="textInput">Text</label>
            <input type="text" id="textInput" name="textInput" required />
            <br />
          </div>
          <div className="border p-8 rounded-lg">
            <label htmlFor="numberInput">Number</label>
            <input type="number" id="numberInput" name="numberInput" required />
            <br />
          </div>
          <div className="border p-8 rounded-lg">
            <button>Upload</button>
          </div>
        </form>
      </div>
    </section>
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
