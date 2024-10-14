import Link from "next/link";

import Profile from "./profile";
import NavMenu from "./navmenu";

export default function Navbar() {
  return (
    <nav className="bg-background py-10">
      <div className="max-w-6xl mx-auto container flex justify-between items-center gap-2">
        <Link href="/" passHref>
          <h1 className="text-primary font-bold text-3xl">SplitFriend</h1>
        </Link>
        <NavMenu></NavMenu>
        {/* PROFILE INFO / BUTTONS */}
        <Profile></Profile>
      </div>
    </nav>
  );
}
