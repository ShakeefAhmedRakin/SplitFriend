"use client";
import { useState } from "react";
import { supabaseBrowser } from "../lib/supabase/browser"; // Adjust the import path as necessary
import useUser from "@/app/auth/hooks/useUser";
import { toast } from "sonner";
import useYourGroups from "@/app/dashboard/hooks/useYourGroups";
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

export default function CreateGroupButton() {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const { data: user } = useUser();
  const { refetch } = useYourGroups();
  const [open, setOpen] = useState(false); // Dialog visibility state

  const handleCreateGroup = async () => {
    const supabase = supabaseBrowser();

    const { data, error } = await supabase.from("groups").insert([
      {
        group_name: groupName,
        group_description: groupDescription,
        created_by: user?.id,
      },
    ]);

    if (error) {
      toast.error("Error creating group:", error.message);
    } else {
      toast.success(`Group ${groupName} created successfully!`);
      refetch();
      setGroupName(""); // Reset form fields
      setGroupDescription("");
      setOpen(false); // Close the dialog
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          Create New Group
          <FaRegPlusSquare />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogDescription>
            Please fill in the details below to create a new group.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="groupName" className="text-right">
              Group Name
            </Label>
            <Input
              id="groupName"
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="groupDescription" className="text-right">
              Description
            </Label>
            <Input
              id="groupDescription"
              type="text"
              placeholder="Enter group description"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              required
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleCreateGroup}>
            Create Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
