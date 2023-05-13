import { EDialogType } from "@/types/enums/EDialogType";
import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from "@chakra-ui/react";
import { X } from "lucide-react";
import { FC } from "react";

interface ConfirmDialogProps {
  type: EDialogType;
  heading: string;
  description: string;
  onConfirm: () => void;
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({ type, heading, description, onConfirm }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button size="xs" variant="unstyled">
          {type === EDialogType.DELETE && <X />}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{heading}</PopoverHeader>
        <PopoverBody>
          {description}
          <Flex justifyContent="flex-end">
            {type === EDialogType.DELETE && (
              <Button colorScheme="red" onClick={() => onConfirm()}>
                Delete
              </Button>
            )}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
