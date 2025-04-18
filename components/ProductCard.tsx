"use client";

import { Image as ProductImage } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

type Props = {
  id: string;
  name: string;
  price: string;
  description: string;
  images: ProductImage[];
  inDuration: number;
};

const ProductCard = (props: Props) => {
  const [displayImageNumber, setDisplayImageNumber] = useState(0);

  return (
    <div
      onMouseEnter={() => setDisplayImageNumber(1)}
      onMouseLeave={() => setDisplayImageNumber(0)}
      className="rounded w-[165px] sm:w-[330px] md:w-[360px] lg:w-[280px] max-h-[400px] m-2 font-nunito"
      data-aos="fade-up"
      data-aos-duration={props.inDuration}
    >
      <div className=" relative h-[150px] sm:h-[310px] lg:h-[235px] w-full overflow-hidden bg-zinc-100 rounded shrink-0">
        <Image
          className=" object-cover"
          src={props.images[displayImageNumber].url}
          alt="product-image"
          fill={true}
          sizes="100%"
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <span className="font-kanit md:text-lg">{props.name}</span>
        <span>₹{props.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
      </div>
    </div>
  );
};

export default ProductCard;
