"use client";
import { useAuth } from "@clerk/nextjs";
import { Search, ShoppingCart, X } from "lucide-react";
// import UserDropDown from "./UserDropDown";
import { useState } from "react";
import Link from "next/link";
// import logo from "../../../public/logo.png";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { userId } = useAuth();
  const [toggleSearch, setToogleSearch] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchParams);
    const encodedSeachPrams = encodeURI(searchParams);
    router.push(`/products?pageParams=1&key=${encodedSeachPrams}`);
    setToogleSearch(false);
  };

  return (
    <div className={`w-screen overflow-hidden text-gray-800 flex flex-col`}>
      <header className="w-screen overflow-x-hidden flex justify-between items-center h-[93px] px-5 md:px-10">
        <div className="relative h-full w-[80px] sm:w-[110px] pb-2 overflow-hidden flex justify-center items-center">
          <Link href={"/"} className="font-bold text-2xl flex">
            Manger
          </Link>
        </div>
        <div className="h-full flex items-center justify-end gap-3 sm:mr-2">
          <div className="sm:mr-1">
            {userId ? (
              <></>
            ) : (
              <Link href={"/sign-in"}>
                <span className="hover:border-b-2 duration-200 border-gray-900">
                  Sign In
                </span>
              </Link>
            )}
          </div>
          <button
            onClick={() => setToogleSearch(true)}
            className="h-full justify-start mr-2 hover:text-gray-900"
          >
            <Search size={"24px"} />
          </button>
          <Link href={"/cart"}>
            <ShoppingCart className="hover:text-gray-900" size={"27px"} />
          </Link>
        </div>
      </header>
      <div
        className={`w-screen shadow-xl absolute ${toggleSearch ? "left-[0%]" : "left-[-110%]"} ease-in-out duration-300 overflow-hidden`}
      >
        <div className="w-full h-[93px] flex items-center justify-center gap-3 bg-white">
          <form
            onSubmit={handleSearch}
            className="h-[50px] w-[75%] sm:w-[53%] rounded-2xl overflow-hidden shadow-xl flex p-2 border-2 border-black"
          >
            <input
              className="w-full h-full px-3 text-md text-gray-900"
              placeholder="Search a product"
              value={searchParams}
              onChange={(e) => setSearchParams(e.target.value)}
              autoFocus
            />
            <button className="mr-1">
              <Search size={"24px"} />
            </button>
          </form>
          <button onClick={() => setToogleSearch(false)}>
            <X size={"24px"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
