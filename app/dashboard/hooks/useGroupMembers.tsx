import { useQuery } from "@tanstack/react-query";
import { supabaseBrowser } from "@/lib/supabase/browser"; // Adjust the import path as necessary
import { toast } from "sonner";

// Fetch function to get group members
const fetchGroupMembers = async (group_id) => {
  const supabase = supabaseBrowser();

  // Fetch members of the group
  const { data, error } = await supabase
    .from("group_members")
    .select("user_id")
    .eq("group_id", group_id);

  if (error) {
    toast.error("Error fetching group members: " + error.message);
    throw new Error(error.message);
  }

  const userIds = data.map((member) => member.user_id);
  if (userIds.length) {
    // Fetch profiles of the users in the group
    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("id, display_name, email, image_url")
      .in("id", userIds);

    if (profileError) {
      toast.error("Error fetching profiles: " + profileError.message);
      throw new Error(profileError.message);
    }

    return profiles;
  }

  return []; // Return an empty array if no userIds
};

// Custom hook to fetch group members
export const useGroupMembers = (group_id) => {
  return useQuery({
    queryKey: ["groupMembers", group_id],
    queryFn: () => fetchGroupMembers(group_id),
    enabled: Boolean(group_id), // Only fetch if group_id is truthy
  });
};
