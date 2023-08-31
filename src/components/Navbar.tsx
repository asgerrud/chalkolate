import { Box, Button, Flex } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <Box bgColor="lightgray" py={4} px={8}>
      <Flex justifyContent="flex-end">
        {user != null ? (
          <Button onClick={() => signOut()}>Sign out</Button>
        ) : (
          <Button onClick={() => signIn()}>Login</Button>
        )}
      </Flex>
    </Box>
  );
}
