"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import useUser from "@/app/auth/hooks/useUser";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogOut = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div>
      {!user?.id ? (
        <Link href="/auth">
          <Button variant="default">Sign In</Button>
        </Link>
      ) : (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="animate-fade outline-none hover:scale-[1.05] hover:border-[2px] hover:shadow-md duration-300 border-2 rounded-full border-primary">
              <Image
                src={user.image_url || ""}
                alt="profile image"
                width={40}
                height={40}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user.display_name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Button
                variant={"destructive"}
                className="w-full"
                onClick={() => handleLogOut()}
              >
                Sign Out
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
