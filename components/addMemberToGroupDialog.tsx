"use client";
import { useState } from "react";
import { supabaseBrowser } from "../lib/supabase/browser"; // Adjust the import path as necessary
import useAllUsers from "@/app/dashboard/hooks/useAllUsers";
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
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { FaRegPlusSquare } from "react-icons/fa";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import useUser from "@/app/auth/hooks/useUser";
import { useGroupMembers } from "@/app/dashboard/hooks/useGroupMembers";

export default function AddMemberButton({ group_id }) {
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
  const { data: currentUser } = useUser();
  const { refetch } = useGroupMembers(group_id);

  // Fetch all users to populate the dropdown
  const { data: users, isLoading, isError } = useAllUsers();

  const handleAddMember = async () => {
    const supabase = supabaseBrowser();

    // Check if the user is already part of the group
    const { data: existingMember, error: checkError } = await supabase
      .from("group_members")
      .select("*")
      .eq("group_id", group_id)
      .eq("user_id", userId);

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 is "No rows found"
      toast.error("Error checking membership:", checkError.message);
      return;
    }

    if (existingMember?.length > 0) {
      toast.error("User is already part of the group");
      return;
    }

    // If the user is not part of the group, insert the new member
    const { data, error } = await supabase.from("group_members").insert([
      {
        group_id: group_id,
        user_id: userId,
      },
    ]);

    if (error) {
      toast.error("Error adding member:", error.message);
    } else {
      toast.success(`Member added successfully to group!`);
      refetch();
      setUserId("");
      setOpen(false); // Close the dialog
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          Add Member
          <FaRegPlusSquare />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member to Group</DialogTitle>
          <DialogDescription>
            Select user to add them to the group.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* User ID Select Dropdown */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="userId" className="text-right">
              Select User
            </Label>
            <Select onValueChange={(value) => setUserId(value)} required>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {isLoading && (
                  <SelectItem value="">Loading users...</SelectItem>
                )}
                {isError && (
                  <SelectItem value="">Error loading users</SelectItem>
                )}
                {users &&
                  users.map((user) => (
                    <SelectItem
                      key={user.id}
                      value={user.id}
                      disabled={user.id === currentUser.id && true}
                    >
                      {user.display_name || user.email}
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
          <Button type="submit" onClick={() => handleAddMember()}>
            Add Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
