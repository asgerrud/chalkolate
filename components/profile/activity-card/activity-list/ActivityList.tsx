import AddActivityModal from "@/components/profile/activity-card/add-activity-modal/AddActivityModal";
import { supabase } from "@/lib/supabase";
import { Activity, ClimbingLocation } from "@/types/database";
import { compareDates } from "@/utils/date";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, Heading, List } from "@chakra-ui/react";
import { useState } from "react";
import ActivityItem from "./activity-item/ActivityItem";

interface ActivityListProps {
  initialActivities: Activity[];
  locations: ClimbingLocation[];
}

export default function ActivityList({ initialActivities, locations }: ActivityListProps) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  function onAddActivity(newActivity: Activity) {
    setActivities([...activities, newActivity].sort((a, b) => compareDates(b.activity_date, a.activity_date)));
  }

  async function removeActivity(id: string) {
    const { error } = await supabase.from("activities").delete().eq("id", id);
    if (error) {
      alert(error.message);
    }

    setActivities(activities.filter((activity: Activity) => activity.id !== id));
  }

  return (
    <>
      <AddActivityModal locations={locations} onAddActivity={onAddActivity} />
      <Divider my={4} />
      <Accordion variant="flat" allowToggle>
        <AccordionItem>
          <Heading>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Show activities
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel py={4}>
            <List spacing={3}>
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

    </>
  );
}
