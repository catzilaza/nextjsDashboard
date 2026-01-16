"use client";

import { useEffect, useState } from "react";
// import { createBlogAction } from '@/lib/actions'
import { toast } from "sonner";
// import { useToast } from "@/hooks/use-toast";
import Editor from "./editor/selectors/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import styles from "./content.module.css";

export const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};

export default function ContentForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [textInput, setTextInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [content, setContent] = useState<string>("");
  const [pending, setPending] = useState(false);
  // const { toast } = useToast();

  useEffect(() => {
    const name = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    setSlug(name);
  }, [title]);

  async function handleSubmit() {
    // TODO: validate the data

    setPending(true);

    // const result = await createBlogAction({ title, slug, content })

    // if (result?.error) {
    //   toast.error(result.error)
    // }
    toast(`Title : ${title} Slug: ${slug} TextInput: ${textInput}`);

    setPending(false);
  }

  return (
    <div className="mt-6 flex max-w-2xl flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          className="bg-red-200"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="border p-8 rounded-lg">
          <label htmlFor="textInput" className="mr-10">
            Text
          </label>
          <input
            onChange={(e) => setTextInput(e.target.value)}
            className={`${styles.textInput} border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            type="text"
            id="textInput"
            name="textInput"
            placeholder="Text"
            required
          />
          <br />
        </div>
        <div className="border p-8 rounded-lg">
          <label htmlFor="numberInput" className="mr-4">
            Number
          </label>
          <input
            onChange={(e) => setNumberInput(e.target.value)}
            className="rounded-md"
            type="number"
            id="numberInput"
            name="numberInput"
            placeholder="Number"
            required
          />
          <br />
        </div>
      </div>

      <Editor initialValue={defaultValue} onChange={setContent} />
      <Button onClick={handleSubmit} disabled={pending}>
        {pending ? "Submitting..." : "Create"}
      </Button>
    </div>
  );
}
