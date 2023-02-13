import {
  createServerSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

export default function ProtectedPage({
  user,
  data,
}: {
  user: User;
  data: any;
}) {
  return (
    <>
      <div>Protected content for {user.email}</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Run queries with RLS on the server
  const { data } = await supabase.from("users").select("*");

  return {
    props: {
      initialSession: session,
      user: session.user,
      data: data ?? [],
    },
  };
};
