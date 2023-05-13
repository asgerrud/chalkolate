import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Flex,
  Heading,
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
import React, { FC, useEffect, useState } from "react";
import { ClimbingLocation, ClimbingZone, Grade, Technique } from "@/types/database";
import SelectInput from "../common/SelectInput";
import { ModalFooter } from "@chakra-ui/modal";
import { CardBody } from "@chakra-ui/card";
import { Camera } from "lucide-react";
import GradeSelect from "./GradeSelect";

type Props = {
  locations: ClimbingLocation[];
  climbingZones: ClimbingZone[];
  techniques: Technique[];
  grades: Grade[];
};

const AddChallenge: FC<Props> = ({ locations, climbingZones, techniques, grades }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [grade, setGrade] = useState<string>(null);
  const [location, setLocation] = useState<string>(locations[0].id);
  const [climbingZone, setClimbingZone] = useState<string>(null);
  const [locationClimbingZones, setLocationClimbingZones] = useState<ClimbingZone[]>(
    getClimbingZonesByLocation(location)
  );
  const [techniquesSelected, setTechniquesSelected] = useState<boolean[]>(new Array(techniques.length).fill(false));

  useEffect(() => {
    setLocationClimbingZones(getClimbingZonesByLocation(location));
  }, [location]);

  function getClimbingZonesByLocation(locationId: string): ClimbingZone[] {
    return climbingZones.filter((climbingZone: ClimbingZone) => climbingZone.location === locationId);
  }

  function onTechniqueSelected(index: number, selected: boolean) {
    techniquesSelected[index] = selected;
    setTechniquesSelected([...techniquesSelected]);
  }

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
              <Card>
                <CardBody>
                  <Flex justifyContent="space-between" px={6} py={4}>
                    <Text>Take picture (coming soon)</Text>
                    <Camera />
                  </Flex>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Heading size="md">Grade</Heading>
                </CardHeader>
                <CardBody pt={0}>
                  <GradeSelect grades={grades} onGradeSelect={(grade) => setGrade(grade)} />
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <Heading size="md">Location and zone</Heading>
                </CardHeader>
                <CardBody pt={0}>
                  <SelectInput
                    nameColumn="name"
                    options={locations}
                    isRequired={true}
                    onSelect={(location) => setLocation(location)}
                  />
                  <Divider my={4} />
                  {locationClimbingZones.length ? (
                    <SelectInput
                      placeholder="Select climbing zone"
                      nameColumn="name"
                      options={locationClimbingZones}
                      onSelect={(climbingZone) => setClimbingZone(climbingZone)}></SelectInput>
                  ) : (
                    <Text color="gray.700">No climbing zones were found for this location</Text>
                  )}
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Heading size="md">Techniques</Heading>
                </CardHeader>
                <CardBody pt={0}>
                  <Stack spacing={2}>
                    {techniques &&
                      techniques.map((technique: Technique, index: number) => (
                        <Checkbox
                          key={technique.id}
                          isChecked={techniquesSelected[index]}
                          onChange={(e) => onTechniqueSelected(index, e.target.checked)}
                          colorScheme="green">
                          {technique.name}
                        </Checkbox>
                      ))}
                  </Stack>
                </CardBody>
              </Card>
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
