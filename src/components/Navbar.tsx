import { Box, Button, Flex, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { EPageRoute } from "~/types/enums/EPageRoute";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <Box bgColor="lightgray" py={4} px={8}>
      <Flex justifyContent="space-between">
        <Button as={Link} href={EPageRoute.HOME}>
          Home
        </Button>
        {user != null ? (
          <HStack spacing={4}>
            <Button as={Link} href={EPageRoute.PROFILE}>
              Profile
            </Button>
            <Button onClick={() => signOut()}>Sign out</Button>
          </HStack>
        ) : (
          <Button onClick={() => signIn()}>Login</Button>
        )}
      </Flex>
    </Box>
  );
}
