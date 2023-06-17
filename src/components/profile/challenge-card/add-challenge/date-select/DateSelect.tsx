import DateInput from "~/components/common/DateInput";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { type Dispatch, type ReactNode, type SetStateAction } from "react";

interface DateSelectProps {
  label: string;
  defaultValue: string;
  maxValue?: string;
  setDate: Dispatch<SetStateAction<string>>;
  children?: ReactNode;
}

export default function DateSelect({ label, defaultValue, maxValue, setDate: setDate, children }: DateSelectProps) {
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
}
