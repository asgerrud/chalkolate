import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Flex,
  Heading,
  Input,
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
import { FC, useEffect, useState } from "react";
import { ClimbingLocation, ClimbingZone, Grade, Technique } from "@/types/database";
import { ModalFooter } from "@chakra-ui/modal";
import { CardBody } from "@chakra-ui/card";
import { Camera } from "lucide-react";
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
  const [selectedTechniques, setSelectedTechniques] = useState<Technique[]>([]);

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
            <Button colorScheme="green" w="100%">
              Add challenge
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AddChallenge;
