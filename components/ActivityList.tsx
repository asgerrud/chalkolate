import { HStack, List, ListItem, Text } from "@chakra-ui/react";
import AddActivity from "@/components/modals/AddActivity";
import { useActivities } from "@/hooks/useActivities";
import { Activity } from "@/types/database";

const ActivityList = () => {
  const { activities } = useActivities();

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      <AddActivity />
      <List spacing={3}>
        <ListItem>Show list of activities</ListItem>
        {activities.map((activity: Activity) => {
          return (
            <HStack key={activity.id}>
              <Text>{formatDate(activity.activity_date)}</Text>
              <Text>{activity.location}</Text>
              <Text>{activity.duration}</Text>
            </HStack>
          );
        })}
      </List>
    </>
  );
};

export default ActivityList;
