"use client";
import { Image as ProductImage } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";

type Props = {
  images: ProductImage[];
};

const ProductImageContainer = ({ images }: Props) => {
  const [currDisplayImage, setCurrDisplayImage] = useState(0);

  return (
    <div className="w-[340px] md:w-[381px] flex flex-col ">
      <div className="w-full h-[340px] md:h-[381px] relative overflow-hidden bg-zinc-200 rounded-xl">
        <Image
          className="object-cover rounded-xl"
          src={images[currDisplayImage].url}
          alt="product image"
          fill={true}
          sizes="100%"
        />
      </div>
      <div className="w-full flex items-center gap-3 my-3">
        {images.map((image, index) => {
          return (
            <div
              key={image.id}
              onClick={() => setCurrDisplayImage(index)}
              className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] relative bg-zinc-200 rounded-xl overflow-hidden shadow-xl hover:scale-110"
            >
              <Image
                className="object-cover"
                src={image.url}
                alt="product image"
                fill={true}
                sizes="100%"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImageContainer;
