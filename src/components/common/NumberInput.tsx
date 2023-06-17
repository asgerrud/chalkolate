import { useState } from "react";
import BaseFormControl from "~/components/common/BaseFormControl";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  type NumberInputFieldProps,
  NumberInputStepper
} from "@chakra-ui/react";

interface NumberInputProps extends NumberInputFieldProps {
  label?: string;
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  defaultValue?: string;
  min?: number;
  max?: number;
  step?: number;
  onInputChange?: (string) => void;
}

export default function NumberInput({
  label,
  isRequired,
  isError,
  errorMessage,
  onInputChange,
  defaultValue,
  min,
  max,
  step,
  ...props
}: NumberInputProps){
  const [value, setValue] = useState<string>(defaultValue ?? "");

  function handleInputChange(value: string): void {
    setValue(value);
    if (onInputChange) {
      onInputChange(value);
    }
  }

  return (
    <BaseFormControl label={label} isRequired={isRequired} isError={isError} errorMessage={errorMessage}>
      <ChakraNumberInput value={value} onChange={handleInputChange} min={min} max={max} step={step}>
        <NumberInputField {...props} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>
    </BaseFormControl>
  );
}
