"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";

export default function useAllUsers() {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const supabase = supabaseBrowser();
      const { data, error } = await supabase.from("profiles").select("*");

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
  });
}
