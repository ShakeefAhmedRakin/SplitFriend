"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";

export default function useGroupExpenses(groupId) {
  return useQuery({
    queryKey: ["groupExpenses", groupId],
    queryFn: async () => {
      const supabase = supabaseBrowser();

      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("group_id", groupId);

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    },
    enabled: !!groupId,
  });
}
