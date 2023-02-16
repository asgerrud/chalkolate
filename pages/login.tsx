import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState();

  useEffect(() => {
    async function loadData() {
      const { data }: any = await supabaseClient.from("test").select("*");
      setData(data);
    }

    // Only run query once user is logged in.
    if (user) {
      loadData();
    }
  }, [user]);

  if (!user) {
    return (
      <Auth
        redirectTo="http://localhost:3000/"
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={["google", "github"]}
        socialLayout="horizontal"
      />
    );
  }

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
    </>
  );
};

export default LoginPage;
