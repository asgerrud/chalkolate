import { EToastStatus } from "@/types/enums/EToastStatus";
import { useToast } from "@chakra-ui/react";

const useSnackbar = () => {
  const toast = useToast();

  const showToast = (status: EToastStatus, title: string, description?: string, duration: number = 2500) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable: true
    });
  };

  return showToast;
};

export default useSnackbar;
