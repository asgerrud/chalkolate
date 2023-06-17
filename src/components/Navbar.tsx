import { Box, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import Link from "next/link";
import { EPageRoute } from "~/types/enums/EPageRoute";
import { signIn, useSession } from "next-auth/react";
import { ChevronDown } from "lucide-react";

function UserMenu() {
  return <Menu>
    <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDown />}>
      Profile
    </MenuButton>
    <MenuList>
      <MenuItem as={Link} href={EPageRoute.PROFILE}>
        View Profile
      </MenuItem>
      <MenuItem as={Link} href={EPageRoute.SETTINGS}>
        Settings
      </MenuItem>
      <MenuDivider />
      <MenuItem>Sign out</MenuItem>
    </MenuList>
  </Menu>
}

export default function Navbar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <Box py={4} px={8}>
      <HStack justifyContent="flex-end">
        {user ? (
          <UserMenu />
        ) : (
          <Text onClick={() => signIn()}>Login</Text>
        )}
      </HStack>
    </Box>
  );
}
