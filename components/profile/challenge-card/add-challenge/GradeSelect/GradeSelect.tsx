import { Grade } from "@/types/database";
import { getGradeColor } from "@/utils/grade";
import { Card, CardBody, CardHeader, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

type gradeId = Grade["id"];

interface GradeSelectProps {
  grades: Grade[];
  setGrade: Dispatch<SetStateAction<gradeId>>;
  children?: ReactNode;
}

const GradeSelect: FC<GradeSelectProps> = ({ grades, setGrade: onGradeSelect, children }) => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>(null);

  const isActiveColor = (grade: Grade): boolean => {
    return selectedGrade?.id === grade.id;
  };

  const gradeColor = (grade: Grade): string => {
    if (selectedGrade != null) {
      return getGradeColor(grade.name, !isActiveColor(grade));
    } else {
      return getGradeColor(grade.name);
    }
  };

  const handleGradeSelect = (grade: Grade): void => {
    const isAlreadySelected: boolean = isActiveColor(grade);
    setSelectedGrade(!isAlreadySelected ? grade : null);
    onGradeSelect(!isAlreadySelected ? grade.id : null);
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Grade</Heading>
      </CardHeader>
      <CardBody pt={0}>
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
};

export default GradeSelect;
