"use client";
import { Label } from "@radix-ui/react-label";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import axios, { AxiosError } from "axios";
// import { AddToCartPayload } from "@/lib/apiValidators/addToCartValidator";
// import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  productId: string;
};

const AddToCartButton = ({ productId }: Props) => {
  const [quantity, setQuantity] = useState(1);
  // const { toast } = useToast();
  const router = useRouter();

  // const { mutate: addToCart, isLoading } = useMutation({
  //   mutationFn: async () => {
  //     const payload: AddToCartPayload = {
  //       productId,
  //       quantity,
  //     };
  //     const { data } = await axios.post("/api/cart/add-to-cart", payload);
  //     return data;
  //   },
  //   onError: (err) => {
  //     if (err instanceof AxiosError) {
  //       if (err.response?.status === 422) {
  //         toast({
  //           variant: "destructive",
  //           title: "Couldn't add product",
  //           description: "Product name should contain atleast 3 character",
  //         });
  //         return;
  //       }
  //       if (err.response?.status === 401) {
  //         router.push("/sign-in");
  //         return;
  //       }
  //       toast({
  //         variant: "destructive",
  //         title: "Couldn't add product to cart",
  //         description: "Some error occured while adding product",
  //       });
  //     }
  //   },
  //   onSuccess: () => {
  //     toast({
  //       title: "Success",
  //       description: "Product Added to cart successfully",
  //     });
  //     router.refresh();
  //   },
  // });
  //
  const isLoading = false;
  return (
    <div className="flex flex-col items-start w-full">
      <button
        onClick={() => console.log("added to cart")}
        disabled={isLoading}
        className="w-full md:w-[70%] h-[40px] max-w-[534px] rounded-xl flex items-center justify-center gap-3 text-white py-2 px-3 mt-3 mb-5 bg-red-600 hover:bg-red-700 duration-500"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={"20px"} />
        ) : (
          <ShoppingCart size={"20px"} />
        )}
        <span className="font-nunito">
          {isLoading ? "Adding to Cart" : "Add to Cart"}
        </span>
      </button>
      <Label className="text-gray-500 font-nunito">Quantity :</Label>
      <div className="w-[120px] h-[35px] flex items-center justify-between rounded-full overflow-hidden border-[1px] border-gray-500 text-gray-500 px-2">
        <button
          onClick={() => setQuantity((prev) => prev - 1)}
          disabled={quantity === 1}
          className="text-gray-700 h-full pr-2 text-lg border-e-[1px] border-gray-500"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="text-gray-700 h-full ps-2 text-lg border-s-[1px] border-gray-500"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AddToCartButton;
