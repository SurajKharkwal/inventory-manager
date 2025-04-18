import { notFound } from "next/navigation";
import { Truck, ShieldCheck } from "lucide-react";
import ProductImageContainer from "@/components/ProductImageContainer";
import AddToCartButton from "@/components/AddToCartButton";
import { prisma } from "@/lib/prisma";

const page = async ({ params }: { params: { id: string } }) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
      include: {
        images: true,
      },
    });
    if (!product) notFound();

    // ₹ {product.pricePerKg.to.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    return (
      <div className="flex flex-col items-center">
        <div className="w-screen flex flex-col md:flex-row items-center px-5 md:items-start md:justify-around py-5 my-3 font-nunito">
          <ProductImageContainer images={product.images} />
          <div
            data-aos="fade-up"
            className="w-screen md:w-[60vw] flex flex-col gap-3 px-5"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading">
              {product.name}
            </h1>
            <h2 className="text-lg md:text-2xl my-2">
              ₹
              {product.pricePerKg
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h2>
            <AddToCartButton productId={product.id} />
            <div className="flex flex-col mt-2 items-start font-kanit gap-2">
              <div className="flex gap-2 items-center text-lg">
                <Truck size={"20px"} />
                <span>Fast Shipping</span>
              </div>
              <div className="flex gap-2 items-center text-lg">
                <ShieldCheck size={"20px"} />
                <span>Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
};

export default page;
