"use client";
import useUser from "@/app/auth/hooks/useUser";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Hero() {
  const { data: user } = useUser();

  return (
    <div className="flex justify-between items-center gap-8 py-10 md:py-32 flex-col-reverse md:flex-row px-4">
      {/* CONTENT */}
      <div className="animate-fade">
        <h1 className="text-3xl md:text-5xl font-extrabold max-w-lg text-primary text-center md:text-left">
          Effortless Group Expense Tracking
        </h1>
        <p className="text-gray-500 text-base md:text-xl mt-3 max-w-lg text-center md:text-left">
          Simplify bill-splitting with SplitFriend—track, manage, and settle
          shared expenses seamlessly with your group
        </p>
        <div className="flex gap-2 items-center justify-center md:justify-start mt-5">
          {user?.id ? (
            <Button>Your Dashboard</Button>
          ) : (
            <Button>Sign Up</Button>
          )}
          <Button variant={"link"}>About Us</Button>
        </div>
      </div>
      {/* IMAGES */}
      <div className="flex justify-center items-center animate-fade">
        <Image src="/heroimage.png" alt="Hero Image" width={350} height={350} />
      </div>
    </div>
  );
}
