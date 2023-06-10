import DateInput from "@/components/common/DateInput";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";

interface DateSelectProps {
  label: string;
  defaultValue: string;
  maxValue?: string;
  setDate: Dispatch<SetStateAction<string>>;
  children?: ReactNode;
}

const DateSelect: FC<DateSelectProps> = ({ label, defaultValue, maxValue, setDate: setDate, children }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{label}</Heading>
      </CardHeader>
      <CardBody>
        <DateInput defaultValue={defaultValue} maxValue={maxValue} setDate={setDate} />
        {children}
      </CardBody>
    </Card>
  );
};

export default DateSelect;
