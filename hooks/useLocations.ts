import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Location } from "@/types/database";

export const useLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetchLocations();
  }, [supabase]);

  const fetchLocations = async () => {
    const { data, error } = await supabase.from("locations").select("*");

    if (error) {
      throw error;
    }

    if (data) {
      setLocations(data);
    }
  };

  return { locations };
};
