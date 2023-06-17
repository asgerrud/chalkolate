import { type EToastStatus } from "~/types/enums/EToastStatus";
import { useToast } from "@chakra-ui/react";

const useSnackbar = () => {
  const toast = useToast();

  return (status: EToastStatus, title: string, description?: string, duration = 2500) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable: true
    });
  };
};

export default useSnackbar;
