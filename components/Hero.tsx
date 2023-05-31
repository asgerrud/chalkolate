import { Box, Button, Card, Center } from "@chakra-ui/react";
import NextLink from "next/link";

const Hero = () => {
  const bgImage: string =
    "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1103&q=80";

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
