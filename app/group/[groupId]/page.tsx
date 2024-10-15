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
import AddExpenseToGroup from "@/components/addExpenseToGroup";
import useUser from "@/app/auth/hooks/useUser";
import GroupExpensesGrid from "@/components/GroupExpensesGrid";
import useGroupExpenses from "@/app/dashboard/hooks/useGroupExpenses";
import useTotalAmountOwed from "@/app/dashboard/hooks/useUserOwed";
import useTotalAmountOwedToYou from "@/app/dashboard/hooks/useUserOwedTo";
import useTotalAmountLeft from "@/app/dashboard/hooks/useTotalAmountOwedForGroup";
import useUserExpenseSummary from "@/app/dashboard/hooks/useDashboardStatistics";

const GroupDetails = ({ params }) => {
  const [group, setGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: currentUser } = useUser();
  const { refetch } = useGroupExpenses(params.groupId);
  const { data: totalOwed, refetch: refetchTotalAmountOwed } =
    useTotalAmountOwed(params.groupId);
  const { data: totalOwedToYou, refetch: refetchTotalAmountOwedToYou } =
    useTotalAmountOwedToYou(params.groupId);
  const { data: totalAmountLeft, refetch: refetchTotalAmountLeft } =
    useTotalAmountLeft(params.groupId);
  const { refetch: refetchDashBoardStatistics } = useUserExpenseSummary();

  const refetchGroupExpenseStatistics = () => {
    refetchTotalAmountOwed();
    refetchTotalAmountOwedToYou();
    refetchTotalAmountLeft();
    refetchDashBoardStatistics();
  };

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
        <div className="flex justify-between gap-2">
          <CardHeader>
            <CardTitle className="uppercase">{group.group_name}</CardTitle>
            <CardDescription>
              {group.group_description || "No description given"}
            </CardDescription>
          </CardHeader>
          <CardHeader>
            <div className="grid grid-cols-2 gap-2 font-bold">
              <h2>Total Amount Owed</h2>
              <h2 className="text-destructive flex justify-end">
                ${totalOwed}
              </h2>
              <h2>Total Amount Owed To You</h2>
              <h2 className="text-primary flex justify-end">
                ${totalOwedToYou}
              </h2>
              <h2>Total Amount Owed By Group</h2>
              <h2 className="text-destructive flex justify-end">
                ${totalAmountLeft}
              </h2>
            </div>
          </CardHeader>
        </div>
        {/* MEMBER INFORMATION */}
        <div className="p-4">
          <CardTitle className="items-center gap-2 flex">
            Members{" "}
            {/* Check if currentUser is defined before accessing its id */}
            {currentUser && group.created_by === currentUser.id && (
              <AddMemberButton group_id={params.groupId}></AddMemberButton>
            )}
          </CardTitle>
          <hr className="my-4" />
          <GroupMembersGrid
            group_id={params.groupId}
            created_by={group.created_by}
          ></GroupMembersGrid>
        </div>
        {/* EXPENSES INFORMATION */}
        <div className="p-4">
          <CardTitle className="items-center gap-2 flex">
            Expenses
            <AddExpenseToGroup
              groupId={params.groupId}
              refetch={refetch}
              refetchGroupExpenseStatistics={refetchGroupExpenseStatistics}
            ></AddExpenseToGroup>
          </CardTitle>
          <hr className="my-4" />
          <GroupExpensesGrid
            groupId={params.groupId}
            refetchGroupExpenseStatistics={refetchGroupExpenseStatistics}
          ></GroupExpensesGrid>
        </div>
      </Card>
    </div>
  );
};

export default GroupDetails;
