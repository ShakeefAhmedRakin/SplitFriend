"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";

export default function useTotalAmountLeft(groupId) {
  return useQuery({
    queryKey: ["total-amount-left-for-group", groupId],
    queryFn: async () => {
      if (!groupId) return 0; // Return 0 if no groupId is provided

      const supabase = supabaseBrowser();

      // Query to get the total amount left to be paid by the group
      const { data: expenses, error } = await supabase
        .from("expenses")
        .select("amount")
        .eq("group_id", groupId)
        .eq("expense_paid_status", false);

      if (error) {
        throw new Error(error.message);
      }

      // Calculate the total amount left to be paid
      const totalAmountLeft =
        expenses?.reduce((total, expense) => total + expense.amount, 0) || 0;

      return totalAmountLeft;
    },
    enabled: !!groupId, // Only enable if groupId is available
  });
}
