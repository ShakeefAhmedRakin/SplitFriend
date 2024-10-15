"use client";
import GroupGrid from "@/components/groupGrid";
import useUserExpenseSummary from "./hooks/useDashboardStatistics";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Dashboard() {
  const { data } = useUserExpenseSummary();

  // NEEDS A WAY TO REFETCH AFTER EXPENSE UPDATES
  // CANNOT USE PROP DRILLING AS IT IS A SEPARATE COMPONENT FROM GROUP DETAILS PAGE
  // CONTEXT API / REDUX

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card for Amount Owed by You */}
        <Card className="bg-primary text-background">
          <CardHeader>
            <CardTitle>Total Amount Owed by You</CardTitle>
            <CardDescription className="text-2xl text-background">
              ${data?.totalOwed || 0}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Card for Amount Owed to You */}
        <Card className="bg-destructive text-background">
          <CardHeader>
            <CardTitle>Total Amount Owed to You</CardTitle>
            <CardDescription className="text-2xl text-background">
              ${data?.totalOwedTo || 0}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <GroupGrid />
    </div>
  );
}
