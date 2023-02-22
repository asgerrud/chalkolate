import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const LoginButton = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {session ? (
        <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      ) : (
        <a href="/login">Log in</a>
      )}
    </>
  );
};

export default LoginButton;
