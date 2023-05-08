import { FC, useState } from "react";
import { Select } from "@chakra-ui/react";
import BaseFormControl from "@/components/common/BaseFormControl";
import { Row, TABLE_NAME } from "@/types/database";

type Props = {
  options: Row<TABLE_NAME>[];
  labelColumn: string;
  label: string;
  isRequired?: boolean;
  onSelect: (string) => void;
};
const SelectInput: FC<Props> = ({ label, labelColumn, options, isRequired, onSelect }) => {
  const [value, setValue] = useState<string>("");

  const isError = value.length === 0;

  const handleSelect = (value: string) => {
    setValue(value);
    onSelect(value);
  };

  return (
    <BaseFormControl label={label} isError={isError} isRequired={isRequired}>
      <Select value={value} onChange={(e) => handleSelect(e.target.value)}>
        <option value="">Select grade</option>
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option[labelColumn]}
          </option>
        ))}
      </Select>
    </BaseFormControl>
  );
};

export default SelectInput;
