import { Grade } from "@/types/database";
import { Card, CardBody, CardHeader, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";

type gradeId = Grade["id"];

type Props = {
  grades: Grade[];
  setGrade: Dispatch<SetStateAction<gradeId>>;
  children?: ReactNode;
};

const GradeSelect: FC<Props> = ({ grades, setGrade: onGradeSelect, children }) => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>(null);

  const isActiveColor = (grade: Grade): boolean => {
    return selectedGrade?.id === grade.id;
  };

  const getGradeColor = (grade: Grade): string => {
    const color: string = grade.name;
    const colorActive: string = color === "black" ? "black" : `${color}.400`;
    const colorInactive: string = color === "black" ? "gray.500" : `${color}.100`;

    if (selectedGrade != null) {
      return isActiveColor(grade) ? colorActive : colorInactive;
    } else {
      return colorActive;
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
              bgColor={getGradeColor(grade)}
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
