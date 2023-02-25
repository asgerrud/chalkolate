import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Calendar, MapPin } from "lucide-react";

const Required = () => (
  <Text as="span" color="red">
    *
  </Text>
);

const CreateActivity = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getLocation = () => {
    console.log("getting location");
  };

  return (
    <>
      <Button mb={4} onClick={onOpen}>
        Add activity
      </Button>
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add activity</ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody>
            <VStack
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={6}>
              <FormControl>
                <FormLabel>Activity date</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Calendar size={18} />}
                  />
                  <Input type="date" isRequired />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Duration</FormLabel>
                <HStack>
                  <Input type="number" placeholder="Hours" w={24} />
                  <span>:</span>
                  <Input type="number" placeholder="Minutes" w={24} />
                </HStack>
              </FormControl>

              <Divider />

              <FormControl>
                <FormLabel>Location</FormLabel>
                <HStack spacing={4}>
                  <Select>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                  <Button colorScheme="gray" onClick={getLocation}>
                    <Flex px={4} alignItems="center">
                      <MapPin size={18} />
                      <Text px={1}>Get location</Text>
                    </Flex>
                  </Button>
                </HStack>
              </FormControl>

              <Divider />

              <Button colorScheme="orange">Submit</Button>
            </VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateActivity;
