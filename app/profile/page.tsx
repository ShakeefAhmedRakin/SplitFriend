"use client";
import useUser from "../auth/hooks/useUser";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function MyProfile() {
  const { data: user } = useUser();

  if (!user) {
    return (
      <div className="py-20 font-bold flex justify-center items-center">
        Loading Profile..
      </div>
    );
  }

  return (
    <Card className="flex justify-center items-center flex-col py-20">
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center my-3">
          <Image
            src={user.image_url || ""}
            alt="profile image"
            width={70}
            height={70}
            className="rounded-full"
          />
        </div>
        <div>
          <h2 className="text-center font-bold text-lg">{user.display_name}</h2>
          <hr className="my-2" />
          <p className="text-center">{user.email}</p>
          <p className="text-center mt-1 text-sm">
            Joined: {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
