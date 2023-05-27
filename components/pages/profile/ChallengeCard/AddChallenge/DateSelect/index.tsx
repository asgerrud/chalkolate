import { Card, CardHeader, CardBody, Input, Heading } from "@chakra-ui/react";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

interface DateSelectProps {
  label: string;
  defaultValue: string;
  maxValue?: string;
  setDate: Dispatch<SetStateAction<string>>;
  children?: ReactNode;
}

const DateSelect: FC<DateSelectProps> = ({ label, defaultValue, maxValue, children, setDate: onDateChange }) => {
  const [date, setDate] = useState<string>(defaultValue);

  function handleDateSelect(date: string) {
    setDate(date);
    onDateChange(date);
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">{label}</Heading>
      </CardHeader>
      <CardBody pt={0}>
        <Input size="md" type="date" value={date} max={maxValue} onChange={(e) => handleDateSelect(e.target.value)} />
        {children}
      </CardBody>
    </Card>
  );
};

export default DateSelect;
