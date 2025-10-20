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
      <CarouselContent className="w-[350px] h-[350px] p-0 m-1">
        {cproducts?.map((cproduct, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <div className="flex items-center justify-center gap-5 rounded-lg bg-white px-3 py-3  hover:bg-blue-200">
                    {" "}
                    <div className="relative overflow-hidden border-2 border-gray-300 h-32 w-32 md:h-32 md:w-32 lg:h-64 lg:w-64 ">
                      <img
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        // height={"auto"}
                        // width={"auto"}
                        src={cproduct.image_url}
                        alt={`${cproduct.name}'s profile picture`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
