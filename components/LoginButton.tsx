import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@chakra-ui/button";

const LoginButton = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {session ? (
        <Button onClick={() => supabase.auth.signOut()} colorScheme="orange">
          Sign Out
        </Button>
      ) : (
        <a href="/login">
          <Button colorScheme="orange">Log in</Button>
        </a>
      )}
    </>
  );
};

export default LoginButton;
