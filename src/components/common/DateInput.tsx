import { getFormattedDateString } from "~/utils/date";
import { Box, Button, Input, InputGroup } from "@chakra-ui/react";
import { type Dispatch, type SetStateAction, useState } from "react";

interface DateInputProps {
  defaultValue: string;
  maxValue?: string;
  setDate: Dispatch<SetStateAction<string>>;
}

export default function DateInput({ defaultValue, maxValue, setDate: onDateChange }: DateInputProps) {
  const today = getFormattedDateString(new Date());
  const [date, setDate] = useState<string>(defaultValue);
  
  function handleDateSelect(date: string): void {
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
}
