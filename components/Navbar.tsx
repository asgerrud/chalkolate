import { Box, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { EPageRoute } from "@/types/enums/EPageRoute";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  const supabase = useSupabaseClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

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
              <MenuItem as={Link} href={EPageRoute.SETTINGS}>
                Settings
              </MenuItem>
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
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
