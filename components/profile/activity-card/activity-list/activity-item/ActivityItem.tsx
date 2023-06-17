import { Activity, ClimbingLocation } from "@/types/database";
import { EDialogType } from "@/types/enums/EDialogType";
import { getFormattedDateString } from "@/utils/date";
import { Flex, HStack, Text } from "@chakra-ui/react";
import ConfirmButton from "@/components/common/dialogs/ConfirmButton";

type ActivityItemProps = {
  activity: Activity;
  locations: ClimbingLocation[];
  onRemoveActivity: (activityId: string) => void;
};

export default function ActivityItem({ activity, locations, onRemoveActivity }: ActivityItemProps) {
  const formattedDate = getFormattedDateString(activity.activity_date);

  function getLocationName(id: string): string {
    const location = locations.find((location: ClimbingLocation) => location.id === id);
    return location?.name || null;
  }

  function removeActivity(): void {
    onRemoveActivity(activity.id);
  }

  return (
    <Flex key={activity.id} w="100%" justifyContent="space-between" alignItems="center" px={3} py={2} bg="lightGreen">
      <HStack spacing={4}>
        <Text>{formattedDate}</Text>
        {getLocationName(activity.location) && <Text>{getLocationName(activity.location)}</Text>}
      </HStack>
      <HStack spacing={4}>
        <Text>{activity.duration}</Text>
        <ConfirmButton
          type={EDialogType.DELETE}
          heading="Delete activity"
          description="Are you sure you want to delete the activity?"
          onConfirm={removeActivity}
        />
      </HStack>
    </Flex>
  );
}
