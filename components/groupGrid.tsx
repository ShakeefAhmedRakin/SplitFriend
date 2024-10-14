"use client";
import useYourGroups from "@/app/dashboard/hooks/useYourGroups";
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
  const { data: groups, isLoading } = useYourGroups();

  return (
    <div>
      <div className="flex gap-2 items-center">
        <CardTitle>Your Groups</CardTitle>
        <CreateGroupButton></CreateGroupButton>
      </div>
      <hr className="my-5" />
      {isLoading ? (
        <>
          <div className="text-center py-20 font-bold">Fetching groups...</div>
        </>
      ) : (
        <>
          {groups?.length === 0 ? (
            <>
              <div className="text-center py-20 font-bold text-primary">
                Create a group to get started!
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                {groups?.map((group) => (
                  <div key={group.id}>
                    <Card className="hover:shadow-md duration-300 hover:border-primary h-full">
                      <CardHeader>
                        <CardTitle className="uppercase">
                          {group.group_name}
                        </CardTitle>
                        <CardDescription>
                          {group.group_description || "No description given"}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex flex-1 justify-between items-end">
                        <div></div>
                        <Link href={`/group/${group.id}`}>
                          <Button variant={"outline"} className="gap-2">
                            Details
                            <FaArrowRight className="text-primary"></FaArrowRight>
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
