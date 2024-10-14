"use client";
import useUser from "@/app/auth/hooks/useUser";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";

export default function useYourGroups() {
  const { data: user } = useUser();

  return useQuery({
    queryKey: ["your-groups"],
    queryFn: async () => {
      const supabase = supabaseBrowser();
      if (user?.id) {
        // fetching groups created by the user
        const { data: groups, error } = await supabase
          .from("groups")
          .select("")
          .eq("created_by", user.id);

        if (error) {
          throw new Error(error.message);
        }

        return groups;
      }
      return [];
    },
    enabled: !!user?.id, // Only run the query if user.id is available
  });
}
