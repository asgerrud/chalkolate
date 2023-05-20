import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
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
  VStack
} from "@chakra-ui/react";
import { Calendar, MapPin } from "lucide-react";
import NumberInput from "@/components/common/NumberInput";
import { FC, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/_supabase";
import { Activity, ClimbingLocation, CreateActivity } from "@/types/database";
import { getDistanceBetween } from "@/utils/geo";

interface AddActivityProps {
  locations: ClimbingLocation[];
  onAddActivity: (activity: Activity) => void;
}

const AddActivityModal: FC<AddActivityProps> = ({ locations, onAddActivity }) => {
  const supabase = useSupabaseClient<Database>();
  const session = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const today = new Date().toISOString().substring(0, 10);

  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("00");
  const [location, setLocation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [date, setDate] = useState<string>(today);

  const isInvalid = date === "";

  const getNearestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const userCoords = { lat: latitude, lon: longitude };
        const nearestLocation: ClimbingLocation = locations.reduce((a: ClimbingLocation, b: ClimbingLocation) => {
          const distA = getDistanceBetween(userCoords, {
            lat: a.latitude,
            lon: a.longitude
          });
          const distB = getDistanceBetween(userCoords, {
            lat: b.latitude,
            lon: b.longitude
          });
          return distA < distB ? a : b;
        });
        setLocation(nearestLocation.id);
      });
    } else {
      alert("An error occurred fetching your location");
    }
  };

  const getDurationInMinutes = (): number => {
    const hoursInMinutes = (Number.parseInt(hours) ?? 0) * 60;
    return (Number.parseInt(minutes) ?? 0) + hoursInMinutes;
  };

  const handleSubmit = async () => {
    if (!session || isInvalid) {
      return;
    }

    const { data: activity, error } = await supabase
      .from("activities")
      .insert<CreateActivity>({
        duration: getDurationInMinutes() || null,
        location: location || null,
        user_id: session.user.id,
        activity_date: date
      })
      .select()
      .single();

    if (error) {
      setErrorMessage(error.message);
    } else {
      onAddActivity(activity);
      onClose();
    }
  };

  return (
    <>
      <Button colorScheme="primary" mb={4} onClick={onOpen}>
        Add activity
      </Button>
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add activity</ModalHeader>
          <ModalCloseButton></ModalCloseButton>
          <ModalBody>
            <VStack justifyContent="flex-start" alignItems="stretch" spacing={6}>
              <FormControl isInvalid={isInvalid} isRequired>
                <FormLabel>Activity date</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Calendar size={18} />
                  </InputLeftElement>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} isRequired />
                  <Box px={2}>
                    <Button onClick={() => setDate(today)}>Today</Button>
                  </Box>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Duration</FormLabel>
                <HStack>
                  <NumberInput w={28} min={0} placeholder="Hours" onInputChange={(hours) => setHours(hours)} />
                  <span>:</span>
                  <NumberInput
                    w={28}
                    min={0}
                    max={59}
                    step={15}
                    defaultValue="00"
                    placeholder="Minutes"
                    onInputChange={(minutes) => setMinutes(minutes)}
                  />
                </HStack>
              </FormControl>
              <Divider />
              <FormControl>
                <FormLabel>Location</FormLabel>
                <HStack spacing={4}>
                  <Select placeholder="Select option" value={location} onChange={(e) => setLocation(e.target.value)}>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </Select>
                  <Button colorScheme="gray" onClick={getNearestLocation}>
                    <Flex px={4} alignItems="center">
                      <MapPin size={18} />
                      <Text px={1}>Find nearest</Text>
                    </Flex>
                  </Button>
                </HStack>
              </FormControl>
              <Divider />
              {errorMessage && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" colorScheme="primary" onClick={handleSubmit}>
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

export default AddActivityModal;
