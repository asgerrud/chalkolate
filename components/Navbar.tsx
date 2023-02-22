import { Box, Flex } from "@chakra-ui/react";
import LoginButton from "@/components/LoginButton";

const Navbar = () => {
  return (
    <Box py={4} px={8} bgColor="gray.100">
      <Flex justifyContent="end">
        <LoginButton />
      </Flex>
    </Box>
  );
};

export default Navbar;
