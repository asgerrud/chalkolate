import { FC, useState } from "react";
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
  defaultValue?: string;
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
  defaultValue,
  min,
  max,
  ...props
}) => {
  const [value, setValue] = useState<string>(defaultValue ?? "");

  const handleInputChange = (value: string) => {
    setValue(value);
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
      <ChakraNumberInput
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}>
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
