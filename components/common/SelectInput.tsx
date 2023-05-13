import { FC, useState } from "react";
import { Select } from "@chakra-ui/react";
import BaseFormControl from "@/components/common/BaseFormControl";
import { Row, TABLE_NAME } from "@/types/database";

type Props = {
  label?: string;
  nameColumn: string;
  options: Row<TABLE_NAME>[];
  isRequired?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onSelect: (string) => void;
};
const SelectInput: FC<Props> = ({ label, nameColumn, options, isRequired, placeholder, defaultValue, onSelect }) => {
  const [value, setValue] = useState(placeholder || defaultValue || options?.[0]?.id);

  const handleSelect = (value: string) => {
    setValue(value);
    onSelect(value);
  };

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
};

export default SelectInput;
