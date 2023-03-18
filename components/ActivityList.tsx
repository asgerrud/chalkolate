import { HStack, List, ListItem, Text } from "@chakra-ui/react";
import AddActivity from "@/components/modals/AddActivity";
import { Activity, ClimbingLocation } from "@/types/database";
import { FC } from "react";

type Props = {
  activities: Activity[];
  locations: ClimbingLocation[];
};

const ActivityList: FC<Props> = ({ activities, locations }) => {
  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
      <AddActivity locations={locations} />
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
