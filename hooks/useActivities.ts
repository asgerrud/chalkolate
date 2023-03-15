import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Activity } from "@/types/database";
import { useSession } from "@supabase/auth-helpers-react";

export const useActivities = () => {
  const session = useSession();

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (session) {
      fetchActivities(session.user.id);
    }
  }, [session]);

  const fetchActivities = async (userId: string) => {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    if (data) {
      setActivities(data);
    }
  };

  return { activities };
};
