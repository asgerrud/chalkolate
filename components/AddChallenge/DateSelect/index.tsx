import { Card, CardHeader, CardBody, Input, Heading } from "@chakra-ui/react";
import { FC, useState } from "react";

type Props = {
  label: string;
  defaultValue: string;
  onDateChange: (date: string) => void;
};

const DateSelect: FC<Props> = ({ label, defaultValue, onDateChange }) => {
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
        <Input size="md" type="date" value={date} onChange={(e) => handleDateSelect(e.target.value)} />
      </CardBody>
    </Card>
  );
};

export default DateSelect;
