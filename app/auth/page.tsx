"use client";
import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function page() {
  const handleLoginWithGoogle = () => {
    const supabase = supabaseBrowser();

    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "www.facebook.com" },
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
