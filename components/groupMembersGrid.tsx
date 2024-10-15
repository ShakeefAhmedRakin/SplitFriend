"use client";
import { Card } from "@/components/ui/card"; // Assuming you have a Card component
import { Avatar } from "@/components/ui/avatar"; // Assuming you have an Avatar component
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import useUser from "@/app/auth/hooks/useUser";
import { useGroupMembers } from "@/app/dashboard/hooks/useGroupMembers";
import Image from "next/image";
import RemoveMember from "./removeMember";

export default function GroupMembersGrid({ group_id }) {
  const { data: currentUser } = useUser();
  const {
    data: members = [],
    isLoading,
    isError,
    refetch,
  } = useGroupMembers(group_id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading && <p>Loading members...</p>}
      {isError && <p>Error loading members.</p>}
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
          {currentUser.id !== member.id ? (
            <RemoveMember
              groupId={group_id}
              memberId={member.id}
              refetch={refetch}
            ></RemoveMember>
          ) : (
            <Button className="mt-2 text-primary font-bold" variant={"ghost"}>
              Owner
            </Button>
          )}
        </Card>
      ))}
      {members.length === 0 && !isLoading && (
        <div className="col-span-full text-center p-4">
          <p className="text-primary font-bold py-10">
            Add members to track their expenses!
          </p>
        </div>
      )}
    </div>
  );
}
