"use client";
import useUser from "@/app/auth/hooks/useUser";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";

export default function useGroupDetails() {
  const { data: user } = useUser();

  return useQuery({
    queryKey: ["group-details"],
    queryFn: async () => {
      const supabase = supabaseBrowser();
      if (user?.id) {
        const { data: groupDetails, error } = await supabase
          .from("group_members")
          .select(
            `
            group_id,
            groups (
              group_name,
              group_description,
              created_by,
              created_at
            )
          `
          )
          .eq("user_id", user.id); // Match the user_id to filter relevant group memberships

        if (error) {
          throw new Error(error.message);
        }

        // Filter out any entries where groups is null to avoid bad data
        const validGroupDetails = groupDetails.filter(
          (group) => group.groups !== null
        );

        return validGroupDetails;
      }

      return [];
    },
    enabled: !!user?.id, // Only run query if user is logged in
  });
}
