import Layout from "~/components/Layout";
import { getProviders, signIn } from "next-auth/react";
import { type GetServerSidePropsContext } from "next";
import { RiDiscordFill, RiGoogleFill } from "react-icons/ri";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { Button } from "~/components/ui/button";

export default function Home({ providers }) {
  const { discord, google } = providers;

  return (
    <Layout pageTitle="Home" navbarDisabled>
      <div className="flex flex-col max-w-[320px]">
        <p className="text-xl mb-10">Start tracking your bouldering skills and develop like a pro</p>
        <div className="flex flex-col w-full space-y-2">
          <Button onClick={() => signIn()}>Login</Button>
          <Button variant="outline" onClick={() => signIn(google.id)}>
            <RiGoogleFill size="1rem" />
            <p className="ml-1">Sign in with {google.name}</p>
          </Button>
          <Button variant="outline" onClick={() => signIn(discord.id)}>
            <RiDiscordFill size="1rem" />
            <p className="ml-1">Sign in with {discord.name}</p>
          </Button>
        </div>
      </div>
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
    props: { providers }
  };
}
