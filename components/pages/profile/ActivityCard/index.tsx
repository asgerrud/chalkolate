import { Activity, ClimbingLocation } from "@/types/database";
import { getWeeklyStreak } from "@/utils/streak";
import { Streak } from "@/utils/types/interfaces/Streak";
import { Card, CardBody } from "@chakra-ui/react";
import { FC } from "react";
import ActivityList from "./ActivityList";
import StreakStats from "./StreakStats/StreakStats";

interface ActivityCardProps {
  activities: Activity[];
  locations: ClimbingLocation[];
}

const ActivityCard: FC<ActivityCardProps> = ({ activities, locations }) => {
  const activityDates = activities.map((activity: Activity) => new Date(activity.activity_date));
  const weeklyStreak: Streak = getWeeklyStreak(activityDates);

  return (
    <Card width="lg">
      <CardBody>
        <StreakStats currentStreak={weeklyStreak.current} highestStreak={weeklyStreak.highest} unit="week" />
        <ActivityList initialActivities={activities} locations={locations} />
      </CardBody>
    </Card>
  );
};

export default ActivityCard;
