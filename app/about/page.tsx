"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <div className="py-10 px-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            About SplitFriend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            SplitFriend is the ultimate solution for group expense management.
            Whether you're planning a trip, splitting rent, or organizing a
            group activity, SplitFriend helps you easily manage and track shared
            expenses. Our app allows users to create groups and add members
            (without any invitations required for logged-in users), making it
            simple to start collaborating.
          </p>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-6 space-y-2 text-lg">
              <li>Create groups and add members instantly.</li>
              <li>Team members can add expenses directly.</li>
              <li>
                Dashboard shows real-time balance of expenses and who owes whom.
              </li>
              <li>
                Seamless bill-splitting to ensure expenses are shared equally
                among the group.
              </li>
              <li>
                No need for invitations, logged-in users can join or create
                groups directly.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Tech Stack */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Tech Stack</CardTitle>
          </CardHeader>
          <CardContent className="text-lg">
            <div className="mt-6 space-y-3">
              <div>
                <Badge variant="secondary" className="mr-2">
                  Frontend
                </Badge>
                <span>Next.js (App Router)</span>
              </div>
              <div>
                <Badge variant="secondary" className="mr-2">
                  Backend/Database
                </Badge>
                <span>Supabase</span>
              </div>
              <div>
                <Badge variant="secondary" className="mr-2">
                  State Management
                </Badge>
                <span>React Query</span>
              </div>
              <div>
                <Badge variant="secondary" className="mr-2">
                  UI Components
                </Badge>
                <span>ShadCN UI</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
``;
