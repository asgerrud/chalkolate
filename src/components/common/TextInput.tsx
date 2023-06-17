import { type ChangeEvent, useState } from "react";
import BaseFormControl, { type BaseFormControlProps } from "~/components/common/BaseFormControl";
import { Input } from "@chakra-ui/react";

interface TextInputProps extends BaseFormControlProps {
  onInputChange?: (string) => void;
}

export default function TextInput({ onInputChange, ...props }: TextInputProps) {
  const [input, setInput] = useState("");

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    setInput(value);
    if (onInputChange) {
      onInputChange(value);
    }
  }

  return (
    <BaseFormControl
      label={props.label}
      isRequired={props.isRequired}
      isError={props.isError}
      errorMessage={props.errorMessage}>
      <Input type="text" value={input} onChange={handleInputChange} {...props}></Input>
    </BaseFormControl>
  );
}

