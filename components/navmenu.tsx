"use client";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import useUser from "@/app/auth/hooks/useUser";

export default function NavMenu() {
  const { data: user } = useUser();

  console.log(user);

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <Link href="/about">
            <Button variant="outline">About</Button>
          </Link>

          {user?.id?.length > 0 && (
            <>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
