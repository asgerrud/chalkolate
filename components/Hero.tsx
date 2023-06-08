import { EPageRoute } from "@/types/enums/EPageRoute";
import { Box, Button, Card, Center, Spinner } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

const bgImage: string =
  "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1103&q=80";

const Hero = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user.id) {
      router.push(EPageRoute.PROFILE);
    }
  });

  if (session?.user.id) {
    return <Spinner size="xl"></Spinner>;
  }

  return (
    <Box w="100%" h="100vh" alignItems="stretch" backgroundImage={bgImage} backgroundSize="cover">
      <Center w="100%" h="100%" bgGradient="linear(to-b, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.53))">
        <NextLink href="/login" passHref>
          <Button w="8rem" h="3rem">
            Login
          </Button>
        </NextLink>
      </Center>
    </Box>
  );
};

export default Hero;
