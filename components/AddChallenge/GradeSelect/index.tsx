import { Grade, Row } from "@/types/database";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { FC, useState } from "react";

type Props = {
  grades: Grade[];
  onGradeSelect: (gradeId: string) => void;
};

const GradeSelect: FC<Props> = ({ grades, onGradeSelect }) => {
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
  );
};

export default GradeSelect;
