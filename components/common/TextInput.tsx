import { useState } from "react";
import BaseFormControl, { BaseFormControlProps } from "@/components/common/BaseFormControl";
import { Input } from "@chakra-ui/react";

interface TextInputProps extends BaseFormControlProps {
  onInputChange?: (string) => void;
}

const TextInput = ({ onInputChange, ...props }: TextInputProps) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (onInputChange) {
      onInputChange(value);
    }
  };

  return (
    <BaseFormControl
      label={props.label}
      isRequired={props.isRequired}
      isError={props.isError}
      errorMessage={props.errorMessage}>
      <Input type="text" value={input} onChange={handleInputChange} {...props}></Input>
    </BaseFormControl>
  );
};

export default TextInput;
