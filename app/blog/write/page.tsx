"use server";

import styles from "./writePage.module.css";
import WriteForm from "@/components/blog/writepage/write-form";
import ImageWrapper from "@/components/blog/writepage/image-wrapper";
import { list } from "@vercel/blob";
import fs from "fs";
import path from "path";

export default async function WritePage() {
  //   const { status } = useSession();
  //   const router = useRouter();

  //   const [open, setOpen] = useState(false);
  //   const [file, setFile] = useState(null);
  //   const [media, setMedia] = useState("");
  //   const [value, setValue] = useState("");
  //   const [title, setTitle] = useState("");
  //   const [catSlug, setCatSlug] = useState("");

  //   useEffect(() => {
  //     const storage = getStorage(app);
  //     const upload = () => {
  //       const name = new Date().getTime() + file.name;
  //       const storageRef = ref(storage, name);

  //       const uploadTask = uploadBytesResumable(storageRef, file);

  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {
  //           const progress =
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           console.log("Upload is " + progress + "% done");
  //           switch (snapshot.state) {
  //             case "paused":
  //               console.log("Upload is paused");
  //               break;
  //             case "running":
  //               console.log("Upload is running");
  //               break;
  //           }
  //         },
  //         (error) => {},
  //         () => {
  //           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //             setMedia(downloadURL);
  //           });
  //         }
  //       );
  //     };

  //     file && upload();
  //   }, [file]);

  // async function onSubmit(values: z.infer<typeof PostDataBlogSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  // const formData = new FormData();
  // formData.append("name", values.name);
  // formData.append("title", values.title);
  // formData.append("desc", values.desc);
  // formData.append("img", values.img);
  // let result: any = formAction(formData);
  // console.log("Result : ", result);
  // console.log("Result : ", values);
  // console.log("Result : ", values.title);
  // console.log("Result : ", values.desc);
  // }
  // const response = await list();
  // console.log("Response from Vercel Blob:", response.blobs);
  // const productsDir = "E:/Nextjs/nextjs-dashboard/public/products";
  // const imageFiles = fs.readdirSync(productsDir).filter(
  //     (file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  //   );
  // const imagePaths = imageFiles.map((file) => `/products/${file}`);
  // console.log("ImagePaths : ", imagePaths);

  return (
    <div className={`${styles.container} mt-14 justify-center items-center`}>
      <div className="flex gap-14">
        <WriteForm />
        {/* <div className="w-[600px]">
          <WriteForm />
        </div> */}
        {/* <div className="bg-gray-200 rounded-md justify-center items-center">
          <ImageWrapper />
        </div> */}
      </div>
      {/* <div className="bg-gray-200 rounded-md justify-center items-center">
        <h1>Image imgUrl</h1>
      </div> */}
    </div>
  );
}

{
  /* <div className={`${styles.container} mt-14`}>
<input
  type="text"
  placeholder="Title"
  className={styles.input}
  onChange={(e) => setTitle(e.target.value)}
/>
<select
  className={`${styles.select} mt-8`}
  onChange={(e) => setCatSlug(e.target.value)}
>
  <option value="style">style</option>
  <option value="fashion">fashion</option>
  <option value="food">food</option>
  <option value="culture">culture</option>
  <option value="travel">travel</option>
  <option value="coding">coding</option>
</select>
<div className={styles.editor}>
  <button className={styles.button} onClick={() => setOpen(!open)}>
    <Image src="/blog/facebook.png" alt="err" width={16} height={16} />
  </button>
  {open && (
    <div className={styles.add}>
      <input
        type="file"
        id="image"
           onChange={(e) => setFile(e.target.files[0])}
        style={{ display: "none" }}
      />
      <button className={styles.addButton}>
        <label htmlFor="image">
          <Image
            src="/blog/tiktok.png"
            alt="err"
            width={16}
            height={16}
          />
        </label>
      </button>
      <button className={styles.addButton}>
        <Image src="/blog/youtube.png" alt="err" width={16} height={16} />
      </button>
      <button className={styles.addButton}>
        <Image src="/blog/youtube.png" alt="err" width={16} height={16} />
      </button>
    </div>
  )}
  <ReactQuill
    className={styles.textArea}
    theme="bubble"
    value={value}
    onChange={setValue}
    placeholder="Tell your story..."
  />
</div>
<button className={styles.publish} onClick={() => alert("handleSubmit")}>
  Publish
</button>
</div> */
}
