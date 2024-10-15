"use client";
import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Assuming you have a Card component in shadcn
import { FcGoogle } from "react-icons/fc";

export default function AuthPage() {
  const params = useSearchParams();
  const next = params.get("next") || "";

  const handleLoginWithGoogle = () => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + "/auth/callback?next=" + next,
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[50vh] bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-extrabold text-primary">
            SplitFriend
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Simplify your experience with seamless authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-center text-sm text-gray-500">
            Please sign in to continue
          </p>
          <Button
            onClick={handleLoginWithGoogle}
            className="w-full gap-2 items-center"
          >
            <FcGoogle className="text-xl"></FcGoogle> Sign In with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
