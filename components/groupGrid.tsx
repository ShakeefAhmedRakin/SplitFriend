"use client";
import useYourGroups from "@/app/dashboard/hooks/useYourGroups";
import useUser from "@/app/auth/hooks/useUser";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreateGroupButton from "./createGroupDialog";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function GroupGrid() {
  const { data: createdGroups, isLoading } = useYourGroups();
  const { data: user } = useUser(); // Get the user data to check group ownership

  return (
    <div>
      {/* Grid for User's Created Groups */}
      <div className="flex gap-4 items-center">
        <CardTitle>Your Groups</CardTitle>
        <CreateGroupButton />
      </div>
      <hr className="my-5" />
      {isLoading ? (
        <div className="text-center py-20 font-bold">Fetching groups...</div>
      ) : (
        <>
          {createdGroups?.length === 0 ? (
            <div className="text-center py-20 font-bold text-primary">
              You are not a part of any groups yet! Create one to get started!
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {createdGroups?.map((group) => (
                <div key={group.group_id}>
                  <Card className="hover:shadow-md duration-300 hover:border-primary h-full">
                    <CardHeader>
                      <CardTitle className="uppercase">
                        {group.groups.group_name}
                      </CardTitle>
                      <CardDescription>
                        {group.groups.group_description ||
                          "No description given"}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-1 justify-between items-end">
                      <div>
                        {/* Badge for membership status */}
                        {/* Badge for group creator */}
                        {user?.id === group.groups.created_by && (
                          <Button variant={"ghost"} className="text-primary">
                            Owned
                          </Button>
                        )}
                        {user?.id !== group.groups.created_by && (
                          <Button
                            variant={"ghost"}
                            className="text-destructive"
                          >
                            Member
                          </Button>
                        )}
                      </div>
                      <Link href={`/group/${group.group_id}`}>
                        <Button variant={"outline"} className="gap-2">
                          Details
                          <FaArrowRight className="text-primary" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
