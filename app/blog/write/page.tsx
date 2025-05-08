"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import styles from "./writePage.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createInvoice } from "@/app/lib/actions";
import { postDataBlogAction } from "@/app/lib/actions/blog/blogAction";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  desc: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  image: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

type State = {
  errors?: string | undefined | null;
  message?: string | undefined | null;
};

//values: z.infer<typeof formSchema>
// export const postAction = (
//   prevState: { message?: string; errors?: string },
//   formData: FormData
// ): State => {
//   alert("handleSubmit");
//   console.log("postAction ====> prevState : ", prevState);
//   console.log("postAction ====> formData : ", formData.get("title"));

//   return { message: "Post created successfully!" };
// };

export default function WritePage() {
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

  const initialState: State = { message: "", errors: "" };
  const [state, formAction] = useActionState<State, FormData>(
    postDataBlogAction,
    initialState
  );

  console.log("WritePage ====> state.message : ", state.message);
  console.log("WritePage ====> state.errors : ", state.errors);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      title: "",
      desc: "",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  //<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
  return (
    <div className={`${styles.container} mt-14 justify-center items-center`}>
      <div className="w-[600px]">
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    {/* <Input placeholder="shadcn" {...field} /> */}
                    <Textarea
                      placeholder="Type your message here."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display discription.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
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
