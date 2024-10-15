"use client";
import { useState } from "react";
import { supabaseBrowser } from "../lib/supabase/browser";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { FaRegCheckCircle } from "react-icons/fa";

export default function MarkAsPaidButton({
  expenseId,
  refetch,
  refetchGroupExpenseStatistics,
}) {
  const [open, setOpen] = useState(false);

  const handleMarkAsPaid = async () => {
    const supabase = supabaseBrowser();

    // Update the expense status
    const { data, error } = await supabase
      .from("expenses")
      .update({ expense_paid_status: true })
      .eq("id", expenseId);

    if (error) {
      toast.error("Error marking expense as paid:", error.message);
    } else {
      toast.success(`Expense marked as paid!`);
      refetch();
      refetchGroupExpenseStatistics();
      setOpen(false); // Close the dialog
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          Mark as Paid
          <FaRegCheckCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Mark as Paid</DialogTitle>
          <DialogDescription>
            Are you sure you want to mark this expense as paid?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleMarkAsPaid}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
