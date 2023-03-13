import { FC } from "react";
import BaseFormControl from "@/components/common/BaseFormControl";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputFieldProps,
  NumberInputStepper,
} from "@chakra-ui/react";

interface NumberInputProps extends NumberInputFieldProps {
  label?: string;
  isRequired?: boolean;
  isError?: boolean;
  errorMessage?: string;
  min?: number;
  max?: number;
  onInputChange?: (string) => void;
}

const NumberInput: FC<NumberInputProps> = ({
  label,
  isRequired,
  isError,
  errorMessage,
  onInputChange,
  min,
  max,
  ...props
}: NumberInputProps) => {
  const handleInputChange = (value: string) => {
    if (onInputChange) {
      onInputChange(value);
    }
  };

  return (
    <BaseFormControl
      label={label}
      isRequired={isRequired}
      isError={isError}
      errorMessage={errorMessage}>
      <ChakraNumberInput onChange={handleInputChange} min={min} max={max}>
        <NumberInputField {...props} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>
    </BaseFormControl>
  );
};

export default NumberInput;
