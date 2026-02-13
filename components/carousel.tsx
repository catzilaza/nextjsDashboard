"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const Carousel = () => {
  const [current, setCurrent] = useState<number>(0);
  return (
    <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300">
      <div className="relative h-80 w-full">
        <img
          src={"/public/products/banana-egg-cake.jpg"}
          alt={"/public/products/banana-egg-cake.jpg"}
          //   layout="fill"
          //   objectFit="cover"
          className="transition-opacity duration-500 ease-in-out"
        />
      </div>

      <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <CardTitle className="text-3xl font-bold text-white mb-2"></CardTitle>
      </CardContent>
    </Card>
  );
};

export default Carousel;
