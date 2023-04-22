import {
  Button,
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text
} from "@chakra-ui/react";
import { Activity, ClimbingLocation } from "@/types/database";
import { FC } from "react";
import { useHydrationSafeDate } from "@/hooks/use-hydration-safe-date";
import { X } from "lucide-react";

type Props = {
  activity: Activity;
  locations: ClimbingLocation[];
  onRemoveActivity: (activityId: string) => void;
};

export const ActivityItem: FC<Props> = ({ activity, locations, onRemoveActivity }) => {
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
        <Popover>
          <PopoverTrigger>
            <Button size="xs" variant="unstyled">
              <X></X>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Delete activity</PopoverHeader>
            <PopoverBody>
              Are you sure you want to delete the activity?
              <Flex justifyContent="flex-end">
                <Button colorScheme="red" onClick={() => removeActivity()}>
                  Delete
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Flex>
  );
};
