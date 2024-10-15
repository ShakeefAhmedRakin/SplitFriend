"use client";
import useUser from "@/app/auth/hooks/useUser";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";

export default function useUserExpenseSummary() {
  const { data: user } = useUser();

  return useQuery({
    queryKey: ["user-expense-summary", user?.id],
    queryFn: async () => {
      if (!user?.id) return { totalOwed: 0, totalOwedTo: 0 }; // Return default values if user is not found

      const supabase = supabaseBrowser();

      // Fetch total amount owed by the user
      const { data: owedExpenses, error: owedError } = await supabase
        .from("expenses")
        .select("amount")
        .eq("member_id", user.id)
        .eq("expense_paid_status", false);

      if (owedError) {
        throw new Error(owedError.message);
      }

      const totalOwed =
        owedExpenses?.reduce((total, expense) => total + expense.amount, 0) ||
        0;

      // Fetch total amount owed to the user
      const { data: owedToExpenses, error: owedToError } = await supabase
        .from("expenses")
        .select("amount")
        .eq("due_to_id", user.id)
        .eq("expense_paid_status", false);

      if (owedToError) {
        throw new Error(owedToError.message);
      }

      const totalOwedTo =
        owedToExpenses?.reduce((total, expense) => total + expense.amount, 0) ||
        0;

      return { totalOwed, totalOwedTo };
    },
    enabled: !!user?.id, // Only enable if user ID is available
  });
}
