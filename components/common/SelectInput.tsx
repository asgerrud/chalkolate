import { useState } from "react";
import { Select } from "@chakra-ui/react";
import BaseFormControl from "@/components/common/BaseFormControl";
import { Row, TABLE_NAME } from "@/types/database";

interface SelectInputProps {
  label?: string;
  nameColumn: string;
  options: Row<TABLE_NAME>[];
  isRequired?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onSelect: (string) => void;
}
export default function SelectInput({
  label,
  nameColumn,
  options,
  isRequired,
  placeholder,
  defaultValue,
  onSelect
}: SelectInputProps){
  const [value, setValue] = useState(placeholder || defaultValue || options?.[0]?.id);

  function handleSelect(value: string): void {
    setValue(value);
    onSelect(value);
  }

  return (
    <BaseFormControl label={label} isError={!value} isRequired={isRequired}>
      <Select variant="filled" value={value} onChange={(e) => handleSelect(e.target.value)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option[nameColumn]}
          </option>
        ))}
      </Select>
    </BaseFormControl>
  );
}
