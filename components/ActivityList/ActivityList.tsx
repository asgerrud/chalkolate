import {
  Box,
  ButtonGroup,
  Flex,
  HStack,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AddActivity from "@/components/modals/AddActivity";
import { Activity, ClimbingLocation } from "@/types/database";
import { FC, Suspense, useState } from "react";
import { Button } from "@chakra-ui/button";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useHydrationSafeDate } from "../../hooks/use-hydration-safe-date";
import { ActivityItem } from "./ActivityItem";

type Props = {
  initialActivities: Activity[];
  locations: ClimbingLocation[];
};

const ActivityList: FC<Props> = ({ initialActivities, locations }) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const onAddActivity = (newActivity: Activity) => {
    setActivities([...activities, newActivity]);
  };

  const removeActivity = async (id: string) => {
    const { error } = await supabase.from("activities").delete().eq("id", id);
    if (error) {
      alert(error.message);
    }

    setActivities(
      activities.filter((activity: Activity) => activity.id !== id),
    );
  };

  return (
    <>
      <AddActivity locations={locations} onAddActivity={onAddActivity} />
      <List spacing={3}>
        <ListItem>Show list of activities</ListItem>
        {activities.map((activity: Activity) => {
          return (
            <Flex
              key={activity.id}
              w="100%"
              justifyContent="space-between"
              alignItems="center"
              px={3}
              py={2}
              bg="gray.100">
              <HStack spacing={4}>
                <ActivityItem activity={activity} locations={locations} />
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
                        <Button
                          colorScheme="red"
                          onClick={() => removeActivity(activity.id)}>
                          Delete
                        </Button>
                      </Flex>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </HStack>
            </Flex>
          );
        })}
      </List>
    </>
  );
};

export default ActivityList;
