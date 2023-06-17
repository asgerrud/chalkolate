import { EDialogType } from "~/types/enums/EDialogType";
import {
  Box,
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

interface ConfirmDialogProps {
  type: EDialogType;
  heading: string;
  description: string;
  buttonLabel?: string;
  onConfirm: () => void;
}

export default function ConfirmButton({ type, heading, description, buttonLabel, onConfirm }: ConfirmDialogProps) {

  function renderButton(): JSX.Element {
    if (buttonLabel) {
      return (
        <Button colorScheme="red">{buttonLabel}</Button>
      );
    } else {
      return (
        <Button size="xs" variant="unstyled">
          <X />
        </Button>
      );
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        {type === EDialogType.DELETE && renderButton()}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{heading}</PopoverHeader>
        <PopoverBody>
          <Box>{description}</Box>
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
}
