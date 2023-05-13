import {
  Alert,
  AlertIcon,
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
import LocationAndZoneSelect from "./LocationAndZoneSelect";
import DateSelect from "./DateSelect";
import TechniqueSelect from "./TechniqueSelect";

type Props = {
  locations: ClimbingLocation[];
  climbingZones: ClimbingZone[];
  techniques: Technique[];
  grades: Grade[];
};

const AddChallenge: FC<Props> = ({ locations, climbingZones, techniques, grades }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const today = new Date().toISOString().substring(0, 10);

  const [startDate, setStartDate] = useState<string>(today);
  const [grade, setGrade] = useState<string>(null);
  const [location, setLocation] = useState<string>(locations[0].id);
  const [climbingZone, setClimbingZone] = useState<ClimbingZone>(null);
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const validateForm = (): boolean => {
    const errorMessages = [];
    if (!startDate) {
      errorMessages.push("Start date is required");
    }

    if (!grade) {
      errorMessages.push("Grade is required");
    }

    if (!location) {
      errorMessages.push("Location is required");
    }

    if (!climbingZone) {
      errorMessages.push("Climbing zone is required");
    }

    setErrorMessages(errorMessages);
    return errorMessages.length === 0;
  };

  const submitForm = () => {
    if (!validateForm()) {
      return;
    }

    const formData: CreateChallenge = {
      climbing_zone: climbingZone.id,
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
              <DateSelect label="Select start day" defaultValue={today} onDateChange={(date) => setStartDate(date)} />
              <GradeSelect grades={grades} onGradeSelect={(grade) => setGrade(grade)} />
              <LocationAndZoneSelect
                defaultLocation={locations[0]}
                locations={locations}
                climbingZones={climbingZones}
                onLocationSelect={(location) => setLocation(location)}
                onClimbingZoneSelect={(climbingZone) => setClimbingZone(climbingZone)}
              />
              <TechniqueSelect
                techniques={techniques}
                onSelectedChange={(techniques) => setSelectedTechniques(techniques)}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Flex w="100%" direction="column">
              {errorMessages?.map((message, index) => (
                <Alert key={index} status="error" mb={2}>
                  <AlertIcon />
                  <Text>{message}</Text>
                </Alert>
              ))}
              <Button colorScheme="green" w="100%" onClick={() => submitForm()}>
                Add challenge
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AddChallenge;
