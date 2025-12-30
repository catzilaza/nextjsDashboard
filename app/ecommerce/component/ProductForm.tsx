"use client";
import React, { useState } from "react";

import ImageUploader from "./ImageUploader";
// import { Product } from "@/models/product";
import { ProductDessertSchema } from "../models/dessert";

interface ProductFormProps {
  initialProduct?: ProductDessertSchema | null;
  onSubmit: (product: ProductDessertSchema) => void;
}

export default function ProductForm() {
  return <div>ProductForm</div>;
}
