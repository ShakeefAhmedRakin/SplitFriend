"use client";
import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useSearchParams } from "next/navigation";

export default function Page() {
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
    <div>
      <Button onClick={() => handleLoginWithGoogle()}>
        Sign Up With Google
      </Button>
    </div>
  );
}
