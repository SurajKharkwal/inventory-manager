// import { db } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProductCard from "./ProductCard";

const BestSellers = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      orders: {
        _count: "desc",
      },
    },
    include: {
      images: true,
    },
    take: 4,
  });
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
      {products.map((product, i) => {
        return (
          <Link href={`/products/${product.id}`}>
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.pricePerKg.toString()}
              description={product.description}
              images={product.images}
              inDuration={300 + i * 200}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default BestSellers;
