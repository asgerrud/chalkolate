import { useHydrationSafeDate } from "@/hooks/use-hydration-safe-date";
import { Activity, ClimbingLocation } from "@/types/database";
import { EDialogType } from "@/types/enums/EDialogType";
import { Flex, HStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { ConfirmDialog } from "../../../../common/dialogs/ConfirmDialog";

type ActivityItemProps = {
  activity: Activity;
  locations: ClimbingLocation[];
  onRemoveActivity: (activityId: string) => void;
};

export const ActivityItem: FC<ActivityItemProps> = ({ activity, locations, onRemoveActivity }) => {
  const formattedDate = useHydrationSafeDate(activity.activity_date);

  const getLocationName = (id: string): string => {
    const location = locations.find((location: ClimbingLocation) => location.id === id);
    return location?.name || null;
  };

  const removeActivity = () => {
    onRemoveActivity(activity.id);
  };

  return (
    <Flex key={activity.id} w="100%" justifyContent="space-between" alignItems="center" px={3} py={2} bg="lightGreen">
      <HStack spacing={4}>
        <Text>{formattedDate}</Text>
        {getLocationName(activity.location) && <Text>{getLocationName(activity.location)}</Text>}
      </HStack>
      <HStack spacing={4}>
        <Text>{activity.duration}</Text>
        <ConfirmDialog
          type={EDialogType.DELETE}
          heading="Delete activity"
          description="Are you sure you want to delete the activity?"
          onConfirm={removeActivity}
        />
      </HStack>
    </Flex>
  );
};
