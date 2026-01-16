import React from "react";
import Image from "next/image";
// import { getDir } from "@/lib/utils/blog/uitls";

export default function ImageWrapper({ probImage }: { probImage: string }) {
  //   const productsDir = `E:/Nextjs/nextjs-dashboard/public/${probImage}`;
  //   const imageFiles = fs
  //     .readdirSync(productsDir)
  //     .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
  //   const imagePaths = imageFiles.map((file) => `/products/${file}`);
  //   console.log("ImagePaths : ", imagePaths);

  console.log("+++++ probImage : ", probImage);

  {
    /* {blob && (
            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-700 font-medium mb-2">
                Upload successful!
              </p>
              <p className="text-sm text-gray-700 break-all">
                File URL:{" "}
                <a
                  href={blob.url}
                  className="text-indigo-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {blob.url}
                </a>
              </p>
            </div>
          )} */
  }

  return (
    <>
      <div>Image : {probImage}</div>
      <div className="w-full h-4"></div>
      <Image
        // src={
        //   form.getValues("img")
        //     ? form.getValues("img")
        //     : "/hero-desktop.png"
        // }
        // src="/hero-desktop.png"
        src={
          probImage.length > 0 ? `/products/${probImage}` : "/hero-desktop.png"
        }
        alt="err"
        priority={true}
        width={400}
        height={300}
        style={{ width: "auto", height: "auto" }}
      />
    </>
  );
}

// <>
//   <div>Image : {probImage}</div>
//   <div className="w-full h-4"></div>
//   <Image
//     src={
//       form.getValues("img")
//         ? form.getValues("img")
//         : "/hero-desktop.png"
//     }
//     src="/hero-desktop.png"
//     src={
//       probImage.length >= 5
//         ? `/products/${probImage}.jpg`
//         : "/hero-desktop.png"
//     }
//     alt="err"
//     priority={true}
//     width={400}
//     height={300}
//     style={{ width: "auto", height: "auto" }}
//   />
// </>
