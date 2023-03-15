import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface BaseFormControlProps {
  label?: string;
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  children: ReactNode;
}

const BaseFormControl = ({
  label,
  isRequired,
  isError,
  errorMessage,
  children,
}: BaseFormControlProps) => {
  return (
    <FormControl w="auto" isRequired={isRequired} isInvalid={isError}>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      {isError && errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default BaseFormControl;
