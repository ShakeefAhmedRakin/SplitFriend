"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";
import useUser from "@/app/auth/hooks/useUser";

export default function useTotalAmountOwed(groupId) {
  const { data: user } = useUser();

  return useQuery({
    queryKey: ["total-amount-owed", groupId, user?.id],
    queryFn: async () => {
      if (!user?.id || !groupId) return 0; // Return 0 if user is not logged in or no groupId provided

      const supabase = supabaseBrowser();

      // Query to get the total amount owed
      const { data: expenses, error } = await supabase
        .from("expenses")
        .select("amount")
        .eq("member_id", user.id)
        .eq("group_id", groupId)
        .eq("expense_paid_status", false);

      if (error) {
        throw new Error(error.message);
      }

      // Calculate the total amount owed
      const totalAmountOwed =
        expenses?.reduce((total, expense) => total + expense.amount, 0) || 0;

      return totalAmountOwed;
    },
    enabled: !!user?.id && !!groupId, // Only enable if user and groupId are available
  });
}
