import Layout from "~/components/Layout";
import { Button, Center, Stack, Text } from "@chakra-ui/react";
import { getProviders, signIn } from "next-auth/react";
import { type GetServerSidePropsContext, type InferGetServerSidePropsType } from "next";
import { RiDiscordFill, RiGoogleFill } from "react-icons/ri";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

export default function Home({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { discord, google } = providers;

  return (
    <Layout pageTitle="Home" navbarDisabled>
      <Center flexDirection="column" maxW="320px">
        <Text fontSize="xl" mb={16}>
          Start tracking your bouldering skills and develop like a pro
        </Text>
        <Stack w="100%" spacing={4}>
          <Button mx="auto" w="100%" onClick={() => signIn()}>
            Login
          </Button>
          <Button variant="outline" colorScheme="black" onClick={() => signIn(google.id)}>
            <RiGoogleFill size="1rem" />
            <Text ml={1}>Sign in with {google.name}</Text>
          </Button>
          <Button variant="outline" colorScheme="black" onClick={() => signIn(discord.id)}>
            <RiDiscordFill size="1rem" />
            <Text ml={1}>Sign in with {discord.name}</Text>
          </Button>
        </Stack>
      </Center>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/profile" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] }
  };
}
