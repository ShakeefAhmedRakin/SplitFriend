"use client";
import { useQuery } from "@tanstack/react-query";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function UserDetail({ userId }) {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userDetails", userId],
    queryFn: async () => {
      const supabase = supabaseBrowser();
      const { data, error } = await supabase
        .from("profiles") // Ensure this matches your user table name
        .select("*")
        .eq("id", userId)
        .single(); // We only need a single user

      if (error) {
        throw new Error(error.message);
      }

      return data; // Return user details
    },
    enabled: !!userId, // Only run the query if userId is provided
  });

  if (isLoading) return <p>Loading user details...</p>;
  if (isError) return <p>Error loading user details.</p>;

  return <span>{user.display_name}</span>; // Display user name or any other property
}
