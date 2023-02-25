import { List, ListItem } from "@chakra-ui/react";
import CreateActivity from "@/components/modals/CreateActivity";

const ActivityList = () => {
  return (
    <>
      <CreateActivity />
      <List spacing={3}>
        <ListItem>Show list of activities</ListItem>
      </List>
    </>
  );
};

export default ActivityList;
