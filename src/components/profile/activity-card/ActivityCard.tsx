import { type Activity, type ClimbingLocation } from "~/types/database";
import { getWeeklyStreak } from "~/utils/streak";
import { type Streak } from "~/utils/types/interfaces/Streak";
import { Card, CardBody } from "@chakra-ui/react";
import ActivityList from "./activity-list/ActivityList";
import StreakStats from "./streak-stats/StreakStats";

interface ActivityCardProps {
  activities: Activity[];
  locations: ClimbingLocation[];
}

export default function ActivityCard({ activities, locations }: ActivityCardProps)  {
  const activityDates = activities.map((activity: Activity) => new Date(activity.activity_date));
  const weeklyStreak: Streak = getWeeklyStreak(activityDates);

  return (
    <Card>
      <CardBody>
        <StreakStats currentStreak={weeklyStreak.current} highestStreak={weeklyStreak.highest} unit="week" />
        <ActivityList initialActivities={activities} locations={locations} />
      </CardBody>
    </Card>
  );
}
