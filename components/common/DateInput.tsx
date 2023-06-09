import { getFormattedDateString } from "@/utils/date";
import { InputGroup, Input, Button, Box } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface DateInputProps {
  defaultValue: string;
  maxValue?: string;
  setDate: Dispatch<SetStateAction<string>>;
}

const DateInput: FC<DateInputProps> = ({ defaultValue, maxValue, setDate: onDateChange }) => {
  const [date, setDate] = useState<string>(defaultValue);

  const today = getFormattedDateString(new Date());

  function handleDateSelect(date: string) {
    setDate(date);
    onDateChange(date);
  }

  return (
    <InputGroup>
      <Input size="md" type="date" value={date} max={maxValue} onChange={(e) => handleDateSelect(e.target.value)} />
      <Box px={2}>
        <Button onClick={() => setDate(today)}>Today</Button>
      </Box>
    </InputGroup>
  );
};

export default DateInput;
