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
import NumberInput from "@/components/common/NumberInput";
import { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const AddActivity = () => {
  const supabase = useSupabaseClient();
  const session = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const getLocation = () => {
    setLocation("option3");
  };

  const handleSubmit = async () => {
    if (!session) {
      return;
    }

    const durationInMinutes =
      Number.parseInt(hours) * 60 + Number.parseInt(minutes);

    const { error } = await supabase
      .from("Activity")
      .insert({
        user_id: session.user.id,
        activity_date: date,
        duration: durationInMinutes,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
    } else {
      onClose();
    }
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
                  <InputLeftElement pointerEvents="none">
                    <Calendar size={18} />
                  </InputLeftElement>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    isRequired
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Duration</FormLabel>
                <HStack>
                  <NumberInput
                    w={28}
                    min={0}
                    placeholder="Hours"
                    onInputChange={(hours) => setHours(hours)}
                  />
                  <span>:</span>
                  <NumberInput
                    w={28}
                    min={0}
                    max={59}
                    placeholder="Minutes"
                    onInputChange={(minutes) => setMinutes(minutes)}
                  />
                </HStack>
              </FormControl>
              <Divider />
              <FormControl>
                <FormLabel>Location</FormLabel>
                <HStack spacing={4}>
                  <Select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}>
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
              <Button type="submit" colorScheme="orange" onClick={handleSubmit}>
                Submit
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddActivity;
