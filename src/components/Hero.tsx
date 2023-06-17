import { Box, Button, Center } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { EPageRoute } from "~/types/enums/EPageRoute";
import Link from "next/link";

const bgImage =
  "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1103&q=80";

export default function Hero() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <Box w="100%" h="100vh" alignItems="stretch" backgroundImage={bgImage} backgroundSize="cover">
      <Center w="100%" h="100%" bgGradient="linear(to-b, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.53))">
        {user == null ?(
          <Button w="8rem" h="3rem" onClick={() => signIn()}>
            Get started
          </Button>
        ):
          <Link href={EPageRoute.PROFILE}>
            <Button w="8rem" h="3rem" onClick={() => signIn()}>
              Profile
            </Button>
          </Link>
        }

      </Center>
    </Box>
  );
}
