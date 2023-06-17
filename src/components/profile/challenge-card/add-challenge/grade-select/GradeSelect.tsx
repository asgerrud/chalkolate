import { type Grade } from "~/types/database";
import { getGradeColor } from "~/utils/grade";
import { Card, CardBody, CardHeader, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { type Dispatch, type ReactNode, type SetStateAction, useState } from "react";

type gradeId = Grade["id"];

interface GradeSelectProps {
  grades: Grade[];
  setGrade: Dispatch<SetStateAction<gradeId>>;
  children?: ReactNode;
}

export default function GradeSelect({ grades, setGrade: onGradeSelect, children }: GradeSelectProps){
  const [selectedGrade, setSelectedGrade] = useState<Grade>(null);

  function isActiveColor(grade: Grade): boolean {
    return selectedGrade?.id === grade.id;
  }

  function gradeColor(grade: Grade): string {
    return getGradeColor(grade.name, selectedGrade ? !isActiveColor(grade) : undefined);
  }

  function handleGradeSelect(grade: Grade): void {
    const isAlreadySelected: boolean = isActiveColor(grade);
    setSelectedGrade(!isAlreadySelected ? grade : null);
    onGradeSelect(!isAlreadySelected ? grade.id : null);
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Grade</Heading>
      </CardHeader>
      <CardBody>
        <SimpleGrid minChildWidth="120px" spacing={2} mb={4}>
          {grades.map((grade: Grade) => (
            <Flex
              key={grade.id}
              h={16}
              cursor="pointer"
              bgColor={gradeColor(grade)}
              transition="background-color 50ms ease-out"
              onClick={() => handleGradeSelect(grade)}
            />
          ))}
        </SimpleGrid>
        {children}
      </CardBody>
    </Card>
  );
}
