import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { ClimbingLocation, ClimbingZone, CreateChallenge, Grade, Technique } from "@/types/database";
import { ModalFooter } from "@chakra-ui/modal";
import GradeSelect from "./GradeSelect";
import LocationClimbingZoneSelect from "./LocationClimbingZoneSelect";
import DateSelect from "./DateSelect";
import TechniqueSelect from "./TechniqueSelect";

interface FormErrors {
  startDate?: string;
  grade?: string;
  location?: string;
  climbingZone?: string;
}

interface AddChallengeProps {
  locations: ClimbingLocation[];
  climbingZones: ClimbingZone[];
  techniques: Technique[];
  grades: Grade[];
}

const AddChallenge: FC<AddChallengeProps> = ({ locations, climbingZones, techniques, grades }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const today = new Date().toISOString().substring(0, 10);

  const [startDate, setStartDate] = useState<string>(today);
  const [grade, setGrade] = useState<string>(null);
  const [location, setLocation] = useState<string>(locations[0].id);
  const [climbingZone, setClimbingZone] = useState<string>(null);
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
  const [errorMessages, setErrorMessages] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!startDate) {
      errors.startDate = "Start date is required";
    }

    if (!grade) {
      errors.grade = "Grade is required";
    }

    if (!location) {
      errors.location = "Location is required";
    }

    if (!climbingZone) {
      errors.climbingZone = "Climbing zone is required";
    }

    const hasErrors: boolean = Object.keys(errors).length > 0;

    if (hasErrors) {
      setErrorMessages(errors);
    } else {
      setErrorMessages({});
    }

    return hasErrors;
  };

  const submitForm = () => {
    if (!validateForm()) {
      return;
    }

    const formData: CreateChallenge = {
      climbing_zone: climbingZone,
      grade: grade,
      location: location,
      start_date: startDate,
      techniques: selectedTechniques
    };

    console.log("SUBMIT FORM", formData);
  };

  return (
    <Flex my={4}>
      <Button w="100%" onClick={onOpen}>
        Add challenge
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add challenge</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <DateSelect label="Select start day" defaultValue={today} setDate={(date) => setStartDate(date)}>
                {!startDate && <Text variant="error">{errorMessages.startDate}</Text>}
              </DateSelect>
              <GradeSelect grades={grades} setGrade={(grade) => setGrade(grade)}>
                {!grade && <Text variant="error">{errorMessages.grade}</Text>}
              </GradeSelect>
              <LocationClimbingZoneSelect
                defaultLocation={locations[0]}
                locations={locations}
                climbingZones={climbingZones}
                setLocation={(location) => setLocation(location)}
                setClimbingZone={setClimbingZone}>
                {!location && <Text variant="error">{errorMessages.location}</Text>}
                {!climbingZone && <Text variant="error">{errorMessages.climbingZone}</Text>}
              </LocationClimbingZoneSelect>
              <TechniqueSelect techniques={techniques} setSelectedTechniques={setSelectedTechniques} />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" w="100%" onClick={() => submitForm()}>
              Add challenge
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AddChallenge;
