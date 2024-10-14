import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "./ui/button";
export default function NavMenu() {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <Link href="/docs">
            <Button variant="outline">About</Button>
          </Link>
          <Link href="/docs">
            <Button variant="outline">My Groups</Button>
          </Link>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
