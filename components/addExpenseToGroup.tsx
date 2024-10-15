"use client";
import { useState } from "react";
import { supabaseBrowser } from "../lib/supabase/browser"; // Adjust the import path as necessary
import useUser from "@/app/auth/hooks/useUser";
import { useGroupMembers } from "@/app/dashboard/hooks/useGroupMembers";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { FaRegPlusSquare } from "react-icons/fa";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function AddExpenseToGroup({
  groupId,
  refetch,
  refetchGroupExpenseStatistics,
}) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [dueToId, setDueToId] = useState("");
  const { data: user } = useUser();
  const { data: groupMembers } = useGroupMembers(groupId);

  const [open, setOpen] = useState(false);

  const handleAddExpense = async () => {
    const supabase = supabaseBrowser();

    if (amount === "" || description === "" || dueToId === "") {
      toast.error("Please fill in all fields.");
      return;
    }

    if (parseFloat(amount) <= 0) {
      toast.error("Amount must be greater than 0.");
      return;
    }

    // Step 1: Insert the new expense
    const { error } = await supabase.from("expenses").insert([
      {
        group_id: groupId,
        member_id: user?.id, // Ensure this is the current user
        due_to_id: dueToId,
        amount: parseFloat(amount), // Convert amount to float
        description,
      },
    ]);

    if (error) {
      toast.error("Error adding expense: " + error.message);
    } else {
      toast.success(`Expense added successfully!`);
      refetch();
      refetchGroupExpenseStatistics();
      setAmount(""); // Reset form fields
      setDescription("");
      setDueToId(""); // Reset due_to_id selection
      setOpen(false); // Close the dialog
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          Add Expense
          <FaRegPlusSquare />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense to Group</DialogTitle>
          <DialogDescription>
            Please fill in the details below to add an expense.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueTo" className="text-right">
              Due To
            </Label>
            <Select value={dueToId} onValueChange={setDueToId} required>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a member" />
              </SelectTrigger>
              <SelectContent>
                {groupMembers?.map((member) => (
                  <SelectItem
                    key={member.id}
                    value={member.id}
                    disabled={user?.id === member.id}
                  >
                    {member.display_name}{" "}
                    {/* Adjust this according to your member structure */}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleAddExpense}>
            Add Expense
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
