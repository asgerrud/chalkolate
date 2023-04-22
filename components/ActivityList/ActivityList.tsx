import AddActivity from "@/components/modals/AddActivity";
import { supabase } from "@/lib/supabase";
import { Activity, ClimbingLocation } from "@/types/database";
import { List, ListItem } from "@chakra-ui/react";
import { FC, useState } from "react";
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

    setActivities(activities.filter((activity: Activity) => activity.id !== id));
  };

  return (
    <>
      <AddActivity locations={locations} onAddActivity={onAddActivity} />
      <List spacing={3}>
        <ListItem>Show list of activities</ListItem>
        {activities.map((activity: Activity) => {
          return (
            <ActivityItem
              key={activity.id}
              activity={activity}
              locations={locations}
              onRemoveActivity={removeActivity}
            />
          );
        })}
      </List>
    </>
  );
};

export default ActivityList;
