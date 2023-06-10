import { Technique } from "@/types/database";
import { Card, CardBody, CardHeader, Checkbox, Heading, Stack } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface TechniqueSelectProps {
  techniques: Technique[];
  setSelectedTechniques: Dispatch<SetStateAction<string[]>>;
}

const TechniqueSelect: FC<TechniqueSelectProps> = ({ techniques, setSelectedTechniques: onSelectedChange }) => {
  const [techniquesSelectedList, setTechniquesSelectedList] = useState<boolean[]>(
    new Array(techniques?.length).fill(false)
  );

  function onTechniqueSelected(index: number, selected: boolean) {
    techniquesSelectedList[index] = selected;
    setTechniquesSelectedList([...techniquesSelectedList]);
    const selectedTechniques = techniques
      .filter((technique: Technique, index: number) => techniquesSelectedList[index])
      .map((technique: Technique) => technique.name.toLowerCase());
    onSelectedChange(selectedTechniques);
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Techniques</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing={2}>
          {techniques &&
            techniques.map((technique: Technique, index: number) => (
              <Checkbox
                key={technique.id}
                isChecked={techniquesSelectedList[index]}
                onChange={(e) => onTechniqueSelected(index, e.target.checked)}
                colorScheme="green">
                {technique.name}
              </Checkbox>
            ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TechniqueSelect;