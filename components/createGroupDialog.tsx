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

    // Step 1: Insert the new group
    const { data: groupData, error: groupError } = await supabase
      .from("groups")
      .insert([
        {
          group_name: groupName,
          group_description: groupDescription,
          created_by: user?.id,
        },
      ])
      .select("*") // Make sure to return all fields
      .single(); // Get single group data back

    // Check if there was an error
    if (groupError) {
      toast.error("Error creating group: " + groupError.message);
      return; // Exit if there's an error
    }

    // Check the retrieved group data
    if (!groupData) {
      toast.error("No group data returned after creation.");
      return; // Exit if there's no data
    }

    console.log("New Group Data:", groupData);

    // Step 2: Insert the group creator into the group_members table
    const { error: memberError } = await supabase.from("group_members").insert([
      {
        group_id: groupData.id, // Use the id of the newly created group
        user_id: user?.id, // Use the current user's id
      },
    ]);

    if (memberError) {
      toast.error("Error adding you to the group: " + memberError.message);
    } else {
      toast.success(`Group ${groupName} created successfully!`);
      refetch(); // Refetch groups to update the list
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
