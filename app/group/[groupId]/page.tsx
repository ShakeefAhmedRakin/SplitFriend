"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddMemberButton from "@/components/addMemberToGroupDialog";
import GroupMembersGrid from "@/components/groupMembersGrid";

const GroupDetails = ({ params }) => {
  const [group, setGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      const supabase = supabaseBrowser();
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .eq("id", params.groupId)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setGroup(data);
      }
      setIsLoading(false);
    };

    if (params.groupId) {
      fetchGroupDetails();
    }
  }, [params.groupId]);

  if (isLoading) {
    return (
      <div className="text-center py-20 font-bold">
        Loading group details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 font-bold">
        Error fetching group details: {error}
      </div>
    );
  }

  if (!group) {
    return <div className="text-center py-20 font-bold">Group not found</div>;
  }

  return (
    <div>
      {/* GROUP INFORMATION */}
      <Card>
        <CardHeader>
          <CardTitle className="uppercase">{group.group_name}</CardTitle>
          <CardDescription>
            {group.group_description || "No description given"}
          </CardDescription>
        </CardHeader>

        <div className="p-4">
          <CardTitle className="items-center gap-2 flex">
            Members<AddMemberButton group_id={params.groupId}></AddMemberButton>
          </CardTitle>
          <hr className="my-4" />
          <GroupMembersGrid group_id={params.groupId}></GroupMembersGrid>
        </div>
      </Card>
      {/* GROUP MEMBERS */}
    </div>
  );
};

export default GroupDetails;
