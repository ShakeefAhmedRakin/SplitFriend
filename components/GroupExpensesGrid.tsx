"use client";
import { Card } from "@/components/ui/card";
import useUser from "@/app/auth/hooks/useUser";
import useGroupExpenses from "@/app/dashboard/hooks/useGroupExpenses";
import UserDetail from "@/app/dashboard/hooks/useUserDetails";
import MarkAsPaidButton from "./updateExpenseDialog";
import { Button } from "./ui/button";

export default function GroupExpensesGrid({
  groupId,
  refetchGroupExpenseStatistics,
}) {
  const { data: currentUser } = useUser();
  const {
    data: expenses = [],
    isLoading,
    isError,
    refetch,
  } = useGroupExpenses(groupId);

  // Check if the expenses are still loading
  if (isLoading) {
    return <p>Loading expenses...</p>;
  }

  // Check for errors in fetching expenses
  if (isError) {
    return <p>Error loading expenses.</p>;
  }

  // Check if currentUser is loaded and valid
  if (!currentUser || !currentUser.id) {
    return <p>User data is not available.</p>; // Handle the case where user data is not loaded
  }

  // Filter expenses based on current user
  const owesExpenses = expenses.filter(
    (expense) => expense.member_id === currentUser.id
  );

  const owedByExpenses = expenses.filter(
    (expense) => expense.due_to_id === currentUser.id
  );

  const otherMembersExpenses = expenses.filter(
    (expense) =>
      expense.member_id !== currentUser.id &&
      expense.due_to_id !== currentUser.id
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Grid for User's Owes and Owed By Expenses */}
      <div className="flex justify-between gap-2">
        {/* Grid for User's Owes Expenses */}
        <div className="flex-1 border-2 p-2 rounded-xl">
          <h2 className="text-xl font-semibold text-center">You Owe</h2>
          <hr className="my-2" />
          <div className="grid grid-cols-1 gap-4">
            {owesExpenses.length > 0 ? (
              owesExpenses.map((expense) => (
                <Card
                  key={expense.id}
                  className={`p-4 w-full flex flex-col ${
                    expense.expense_paid_status
                      ? "border-primary"
                      : "border-destructive"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      Amount: ${expense.amount}
                    </h3>
                    {/* Button to settle the expense */}
                    {expense.expense_paid_status || (
                      <MarkAsPaidButton
                        expenseId={expense.id}
                        refetch={refetch}
                        refetchGroupExpenseStatistics={
                          refetchGroupExpenseStatistics
                        }
                      />
                    )}
                  </div>

                  <p className="text-sm text-gray-600">
                    Description: {expense.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    Owed To:{" "}
                    <span className="text-primary">
                      <UserDetail userId={expense.due_to_id} />
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Owed by:{" "}
                    <span className="text-destructive">
                      <UserDetail userId={expense.member_id} />
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Date: {new Date(expense.created_at).toLocaleDateString()}
                  </p>
                  {/* Payment Status */}
                  <p
                    className={`text-xs font-semibold ${
                      expense.expense_paid_status
                        ? "text-primary"
                        : "text-destructive"
                    }`}
                  >
                    {expense.expense_paid_status
                      ? "Status: Paid"
                      : "Status: Unpaid"}
                  </p>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p>No expenses where you owe money.</p>
              </div>
            )}
          </div>
        </div>
        {/* Grid for User's Owed By Expenses */}
        <div className="flex-1 border-2 p-2 rounded-xl">
          <h2 className="text-xl font-semibold text-center">You Are Owed By</h2>
          <hr className="my-2" />
          <div className="grid grid-cols-1 gap-4">
            {owedByExpenses.length > 0 ? (
              owedByExpenses.map((expense) => (
                <Card
                  key={expense.id}
                  className={`p-4 w-full flex flex-col ${
                    expense.expense_paid_status
                      ? "border-primary"
                      : "border-destructive"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      Amount: ${expense.amount}
                    </h3>
                    {/* Display due button or empty based on payment status */}
                    {expense.amount === 0 ? (
                      <></>
                    ) : (
                      <Button variant={"destructive"}>DUE</Button>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Description: {expense.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    Owed To:{" "}
                    <span className="text-primary">
                      <UserDetail userId={expense.due_to_id} />
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Owed by:{" "}
                    <span className="text-destructive">
                      <UserDetail userId={expense.member_id} />
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Date: {new Date(expense.created_at).toLocaleDateString()}
                  </p>
                  {/* Payment Status */}
                  <p
                    className={`text-xs font-semibold ${
                      expense.expense_paid_status
                        ? "text-primary"
                        : "text-destructive"
                    }`}
                  >
                    {expense.expense_paid_status
                      ? "Status: Paid"
                      : "Status: Unpaid"}
                  </p>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p>No expenses where you are owed money.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid for other member's expenses*/}
      <div className="flex-1 border-2 p-2 rounded-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Other Member's Expenses
        </h2>
        <hr className="my-2" />
        <div className="grid grid-cols-1 gap-4">
          {otherMembersExpenses.length > 0 ? (
            otherMembersExpenses.map((expense) => (
              <Card
                key={expense.id}
                className={`p-4 w-full flex flex-col ${
                  expense.expense_paid_status
                    ? "border-primary"
                    : "border-destructive"
                }`}
              >
                <h3 className="text-lg font-semibold">
                  Amount: ${expense.amount}
                </h3>
                <p className="text-sm text-gray-600">
                  Description: {expense.description}
                </p>
                <p className="text-xs text-gray-500">
                  Member: <UserDetail userId={expense.member_id} />
                </p>
                <p className="text-xs text-gray-500">
                  Date: {new Date(expense.created_at).toLocaleDateString()}
                </p>
                {/* Payment Status */}
                <p
                  className={`text-xs font-semibold ${
                    expense.expense_paid_status
                      ? "text-primary"
                      : "text-destructive"
                  }`}
                >
                  {expense.expense_paid_status
                    ? "Status: Paid"
                    : "Status: Unpaid"}
                </p>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center px-4 py-10">
              <p>No expenses recorded by other members.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
