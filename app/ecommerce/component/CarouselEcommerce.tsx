"use client";

import Autoplay from "embla-carousel-autoplay";
import { ProductDessertSchema } from "../models/dessert";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselEcommerce({
  products,
}: {
  products?: ProductDessertSchema[];
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
        {products?.map((product, index) => (
          <CarouselItem key={index}>
            <Card className="w-[250px] h-[180px] bg-blue-200 p-1 m-1">
              <CardContent className="flex items-center justify-center">
                <img
                  className="object-cover w-[250px] h-[180px] transition-transform duration-300 hover:scale-105"
                  // height={"auto"}
                  // width={"auto"}
                  src={product.image_url}
                  alt={`${product.name}'s profile picture`}
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
