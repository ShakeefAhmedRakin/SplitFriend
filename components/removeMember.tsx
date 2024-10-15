"use client";
import { Button } from "./ui/button";
import { toast } from "sonner"; // Make sure you have this imported
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function RemoveMember({ groupId, memberId, refetch }) {
  const handleRemoveMember = async () => {
    const supabase = supabaseBrowser();

    console.log(groupId, memberId);

    const { error } = await supabase
      .from("group_members")
      .delete()
      .eq("group_id", groupId)
      .eq("user_id", memberId);

    if (error) {
      toast.error("Error removing member: " + error.message);
    } else {
      toast.success("Member removed successfully from the group!");
      refetch(); // Refetch the group members to update the UI
    }
  };

  return (
    <div>
      <Button variant="outline" className="mt-2" onClick={handleRemoveMember}>
        Remove
      </Button>
    </div>
  );
}
