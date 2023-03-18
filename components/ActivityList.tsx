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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AddActivity from "@/components/modals/AddActivity";
import { Activity, ClimbingLocation } from "@/types/database";
import { FC, useState } from "react";
import { Button } from "@chakra-ui/button";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Props = {
  initialActivities: Activity[];
  locations: ClimbingLocation[];
};

const ActivityList: FC<Props> = ({ initialActivities, locations }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
  };

  const onAddActivity = (newActivity: Activity) => {
    setActivities([...activities, newActivity]);
  };

  const removeActivity = async (id: string) => {
    const { data, error } = await supabase
      .from("activities")
      .delete()
      .eq("id", id);
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
              <HStack w="100%" justifyContent="space-between" spacing={2}>
                <Text>{formatDate(activity.activity_date)}</Text>
                <Text>{activity.location}</Text>
                <Text>{activity.duration}</Text>
              </HStack>
              <Box ml={2}>
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
              </Box>
            </Flex>
          );
        })}
      </List>
    </>
  );
};

export default ActivityList;
