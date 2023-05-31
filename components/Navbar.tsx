import { Box, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { EPageRoute } from "@/types/enums/EPageRoute";

const Navbar = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <Box py={4} px={8}>
      <HStack justifyContent="flex-end">
        {session ? (
          <Menu>
            <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}>
              Profile
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} href={EPageRoute.PROFILE}>
                View Profile
              </MenuItem>
              <MenuItem onClick={() => supabase.auth.signOut()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link href={EPageRoute.LOGIN}>Login</Link>
        )}
      </HStack>
    </Box>
  );
};

export default Navbar;
