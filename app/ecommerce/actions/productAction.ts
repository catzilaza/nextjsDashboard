"use server";

import postgres from "postgres";
import { Product } from "../lib/db/models/product";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function fetchAllProduct() {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  // sql<ProductDessertField[]>

  try {
    const products = await prisma.product.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return products;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all products.");
  }
}

export async function fetchProductById(id: string) {
  try {
    const data = await prisma.product.findMany({
      where: {
        id: id,
      },
    });
    //  console.log("function fetchProductById(id: string) ===> : ", data);
    const product = data.map((product) => ({
      ...product,
    }));

    return product[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products_desserts.");
  }
}

type ProductState = {
  message?: string | null;
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    stock?: string[];
    image?: string[];
  };
};

export async function createProduct(
  prevState: ProductState,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const imageFile = formData.get("image") as File;

  if (
    !name ||
    !description ||
    !price ||
    !stock ||
    !imageFile ||
    imageFile.size === 0
  ) {
    return {
      message: "Please provide complete product details including an image.",
    };
  }

  //   const uploadedImagesData = await uploadProductImages(formData);
  //   console.log("uploadedImagesData : ", uploadedImagesData);

  try {
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });

    // Simulate database creation
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        image: imageFile.name,
        image_url: blob.url,
      },
    });
    // console.log("Product created:", product);
    // console.log("Creating product:", { name, description, price, stock });

    // revalidatePath("/dashboard/products");
    return {
      message: "Product created successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to create product.",
    };
  }
}

/**
 * ฟังก์ชันสำหรับอัปโหลดรูปภาพสินค้าหลายรูปไปยัง Vercel Blob
 * @param formData - The FormData object from the form submission.
 * @returns An array of objects containing the url and pathname of each uploaded image.
 */
async function uploadProductImages(formData: FormData) {
  const uploadedImages: { url: string; pathname: string }[] = [];

  // 1. ดึงไฟล์ทั้งหมดจาก field ที่ชื่อ 'images' (จะได้เป็น Array เสมอ)
  const imageFiles = formData.getAll("images") as File[];

  if (imageFiles && imageFiles.length > 0) {
    // 2. วนลูปเพื่ออัปโหลดทีละไฟล์
    for (const imageFile of imageFiles) {
      // ตรวจสอบว่าเป็นไฟล์ที่มีข้อมูลจริงๆ
      if (imageFile instanceof File && imageFile.size > 0) {
        try {
          // 3. อัปโหลดไฟล์ไปยัง Vercel Blob และจำลองการเก็บในโฟลเดอร์
          const blob = await put(
            `Ecommerce_Product_Images/${imageFile.name}`, // ใส่ชื่อโฟลเดอร์นำหน้า
            imageFile,
            {
              access: "public", // ตั้งค่าให้เข้าถึงไฟล์ได้แบบสาธารณะ
            },
          );

          // 4. เก็บผลลัพธ์ (url และ pathname) ไว้ใน Array
          uploadedImages.push({
            url: blob.url,
            pathname: blob.pathname, // pathname มีประโยชน์สำหรับใช้ลบไฟล์ในอนาคต
          });
        } catch (error) {
          console.error(`Failed to upload ${imageFile.name}:`, error);
          // สามารถจัดการข้อผิดพลาดของแต่ละไฟล์ที่นี่ได้
        }
      }
    }
  }

  // คืนค่า Array ของข้อมูลรูปภาพที่อัปโหลดสำเร็จ
  return uploadedImages;
}

// --- ตัวอย่างการใช้งานใน Server Action ---
// export async function createProduct(prevState: any, formData: FormData) {
//   // ... ดึงข้อมูลอื่นๆ จาก formData ...
//
//   const uploadedImagesData = await uploadProductImages(formData);
//
//   // ... นำ uploadedImagesData ไปบันทึกลงฐานข้อมูล ...
//   // เช่น:
//   // const product = await prisma.product.create({
//   //   data: {
//   //     name,
//   //     price,
//   //     images: {
//   //       create: uploadedImagesData.map(img => ({ url: img.url, pathname: img.pathname }))
//   //     }
//   //   }
//   // });
//
//   return { message: 'Product created successfully!' };
// }
//
// import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
// import ErrorHandler from "../middlewares/errorMiddleware.js";
// import { v2 as cloudinary } from "cloudinary";
// import database from "../database/db.js";
// import { getAIRecommendation } from "../utils/getAIRecommendation.js";

// export const createProduct = catchAsyncErrors(async (req, res, next) => {
//   const { name, description, price, category, stock } = req.body;
//   const created_by = req.user.id;

//   if (!name || !description || !price || !category || !stock) {
//     return next(
//       new ErrorHandler("Please provide complete product details.", 400)
//     );
//   }

//   let uploadedImages = [];
//   if (req.files && req.files.images) {
//     const images = Array.isArray(req.files.images)
//       ? req.files.images
//       : [req.files.images];

//     for (const image of images) {
//       const result = await cloudinary.uploader.upload(image.tempFilePath, {
//         folder: "Ecommerce_Product_Images",
//         width: 1000,
//         crop: "scale",
//       });

//       uploadedImages.push({
//         url: result.secure_url,
//         public_id: result.public_id,
//       });
//     }
//   }

//   const product = await database.query(
//     `INSERT INTO products (name, description, price, category, stock, images, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
//     [
//       name,
//       description,
//       price / 283,
//       category,
//       stock,
//       JSON.stringify(uploadedImages),
//       created_by,
//     ]
//   );

//   res.status(201).json({
//     success: true,
//     message: "Product created successfully.",
//     product: product.rows[0],
//   });
// });
//===============================================================

type ProductFilterState = {
  message?: string | null;
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    stock?: string[];
    image?: string[];
    availability?: string[];
    category?: string[];
    ratings?: string[];
    search?: string[];
    page?: string;
  };
};
export async function fetchProductByFilter(
  prevState: ProductFilterState,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const imageFile = formData.get("image") as File;
  const availability = formData.get("availability") as string;
  const category = formData.get("category") as string;
  const ratings = Number(formData.get("ratings"));
  const search = formData.get("search") as string;
  const page = formData.get("page") as string;

  const pageNow = parseInt(page) || 1;
  const limit = 10;
  const offset = (pageNow - 1) * limit;

  const where: any = {};
  let values = [];
  let index = 1;

  let paginationPlaceholders = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  // Get count of filtered products
  const totalProducts = await prisma.product.count({
    where,
  });

  return {
    message: "Product created successfully.",
  };
}

export async function updateProduct(
  prevState: ProductState,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));
  const imageFile = formData.get("image") as File;
  const id = formData.get("id") as string;

  if (
    !name ||
    !description ||
    !price ||
    !stock ||
    !imageFile ||
    imageFile.size === 0
  ) {
    return {
      message: "Please provide complete product details including an image.",
    };
  }

  //   const uploadedImagesData = await uploadProductImages(formData);
  //   console.log("uploadedImagesData : ", uploadedImagesData);

  try {
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });

    // Simulate database creation
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
        price,
        stock,
        image: imageFile.name,
        image_url: blob.url,
      },
    });
    console.log("Update Product :", product);
    console.log("Updatinging product:", { name, description, price, stock });

    return {
      message: "Product updated successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to update product.",
    };
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.delete({
      where: {
        id: id,
      },
    });

    if (!product) {
      return { message: "Product not found. 404" };
    }

    return {
      message: "Product deleted successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to delete product.",
    };
  }
}
