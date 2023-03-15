import { List, ListItem } from "@chakra-ui/react";
import AddActivity from "@/components/modals/AddActivity";

const ActivityList = () => {
  return (
    <>
      <AddActivity />
      <List spacing={3}>
        <ListItem>Show list of activities</ListItem>
      </List>
    </>
  );
};

export default ActivityList;
