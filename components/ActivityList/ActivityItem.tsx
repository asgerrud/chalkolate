import { Text } from "@chakra-ui/react";
import { Activity, ClimbingLocation } from "@/types/database";
import { FC } from "react";
import { useHydrationSafeDate } from "@/hooks/use-hydration-safe-date";

type Props = {
  activity: Activity;
  locations: ClimbingLocation[];
};

export const ActivityItem: FC<Props> = ({ activity, locations }) => {
  const formattedDate = useHydrationSafeDate(activity.activity_date);
  const getLocationName = (id: string): string => {
    const location = locations.find(
      (location: ClimbingLocation) => location.id === id,
    );
    return location?.name || null;
  };

  return (
    <>
      <Text>{formattedDate}</Text>
      {getLocationName(activity.location) && (
        <Text>{getLocationName(activity.location)}</Text>
      )}
    </>
  );
};
