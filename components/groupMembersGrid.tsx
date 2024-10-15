"use client";
import { Card } from "@/components/ui/card"; // Assuming you have a Card component
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import useUser from "@/app/auth/hooks/useUser";
import { useGroupMembers } from "@/app/dashboard/hooks/useGroupMembers";
import Image from "next/image";
import RemoveMember from "./removeMember";

export default function GroupMembersGrid({ group_id, created_by }) {
  const { data: currentUser, isLoading: isUserLoading } = useUser();
  const {
    data: members = [],
    isLoading: isMembersLoading,
    isError,
    refetch,
  } = useGroupMembers(group_id);

  // Check if the user data is still loading or if there's an error
  if (isUserLoading) {
    return <p>Loading user information...</p>;
  }

  if (!currentUser) {
    return <p>User is not authenticated.</p>;
  }

  if (isMembersLoading) {
    return <p>Loading members...</p>;
  }

  if (isError) {
    return <p>Error loading members.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {members.map((member) => (
        <Card key={member.id} className="p-4 flex flex-col items-center">
          <Image
            src={member.image_url || "profile-pic.jpg"}
            className="mb-2 rounded-full"
            width={70}
            height={70}
            alt="User profile image"
          />
          <h3 className="text-lg font-semibold">
            {member.display_name || member.email}
          </h3>

          <p className="text-sm text-gray-600">{member.email}</p>

          {member.id === created_by && (
            <Button className="mt-2 text-primary font-bold" variant={"ghost"}>
              Owner
            </Button>
          )}

          {member.id !== created_by && (
            <Button className="mt-2 text-red-500 font-bold" variant={"ghost"}>
              Member
            </Button>
          )}

          {currentUser.id !== member.id && currentUser.id === created_by && (
            <RemoveMember
              groupId={group_id}
              memberId={member.id}
              refetch={refetch}
            />
          )}
        </Card>
      ))}
      {members.length === 0 && (
        <div className="col-span-full text-center p-4">
          <p className="text-primary font-bold py-10">
            Add members to track their expenses!
          </p>
        </div>
      )}
    </div>
  );
}
