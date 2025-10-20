"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductDessertSchema } from "@/app/lib/definitions";
import Autoplay from "embla-carousel-autoplay";
//w-full max-w-xs

export default function CarouselProduct({
  cproducts,
}: {
  cproducts?: ProductDessertSchema[];
}) {
  return (
    <Carousel
      className="w-full max-w-screen-2xl"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="w-[250px] h-[180px]">
        {cproducts?.map((cproduct, index) => (
          <CarouselItem key={index}>
            <Card className="w-[250px] h-[180px] bg-blue-200 p-1 m-1">
              <CardContent className="flex items-center justify-center">
                <img
                  className="object-cover w-[250px] h-[180px] transition-transform duration-300 hover:scale-105"
                  // height={"auto"}
                  // width={"auto"}
                  src={cproduct.image_url}
                  alt={`${cproduct.name}'s profile picture`}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}