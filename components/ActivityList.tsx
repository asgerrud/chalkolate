import { HStack, List, ListItem, Text } from "@chakra-ui/react";
import AddActivity from "@/components/modals/AddActivity";
import { Activity, ClimbingLocation } from "@/types/database";
import { FC, useState } from "react";

type Props = {
  initialActivities: Activity[];
  locations: ClimbingLocation[];
};

const ActivityList: FC<Props> = ({ initialActivities, locations }) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
  };

  const onAddActivity = (newActivity: Activity) => {
    setActivities([...activities, newActivity]);
  };

  return (
    <>
      <AddActivity locations={locations} onAddActivity={onAddActivity} />
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
