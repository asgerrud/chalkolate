import AddActivityModal from "@/components/profile/activity-card/activity-list/add-activity-modal/AddActivityModal";
import { supabase } from "@/lib/supabase";
import { Activity, ClimbingLocation } from "@/types/database";
import { compareDates } from "@/utils/date";
import { List, ListItem } from "@chakra-ui/react";
import { FC, useState } from "react";
import { ActivityItem } from "./activity-item/ActivityItem";

interface ActivityListProps {
  initialActivities: Activity[];
  locations: ClimbingLocation[];
}

const ActivityList: FC<ActivityListProps> = ({ initialActivities, locations }) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const onAddActivity = (newActivity: Activity) => {
    setActivities([...activities, newActivity].sort((a, b) => compareDates(b.activity_date, a.activity_date)));
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
      <AddActivityModal locations={locations} onAddActivity={onAddActivity} />
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
