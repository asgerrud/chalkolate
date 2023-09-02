import { api } from "~/lib/api";
import { Box, Card, CardBody, Center, Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { NewChallengeForm } from "~/components/NewChallengeForm";

dayjs.extend(relativeTime);

function NoChallengesFound() {
  return <Text>No challenges found</Text>;
}

export default function ChallengeList() {
  const challenges = api.challenge.findUserChallenges.useQuery({});

  const hasChallenges = challenges.data?.length;

  if (challenges.isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Box p={4} my={2} bgColor="lightGreen">
      <Heading size="md" mb={4}>
        Challenges
      </Heading>
      <Stack spacing={4}>
        {hasChallenges ? (
          <Stack spacing={4}>
            {challenges?.data?.map((challenge) => {
              const { id, grade, location, zone, endDate } = challenge;
              const timeToChallengeEnd = dayjs(endDate).fromNow(true);

              return (
                <Card key={id}>
                  <CardBody>
                    <Flex justifyContent="space-between">
                      <Stack>
                        <Text fontWeight="bold">{location.name}</Text>
                        <Text>{zone.name}</Text>
                      </Stack>
                      <Stack textAlign="end">
                        <Text>{timeToChallengeEnd} remaining</Text>
                        <Text>{grade.name}</Text>
                      </Stack>
                    </Flex>
                  </CardBody>
                </Card>
              );
            })}
          </Stack>
        ) : (
          <NoChallengesFound />
        )}
        <NewChallengeForm />
      </Stack>
    </Box>
  );
}
