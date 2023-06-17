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
import { useEffect, useState } from "react";
import { Challenge, ChangeSchedule, ClimbingLocation, ClimbingZone, CreateChallenge, Grade, Technique } from "@/types/database";
import { ModalFooter } from "@chakra-ui/modal";
import GradeSelect from "./grade-select/GradeSelect";
import LocationClimbingZoneSelect from "./location-climbing-zone-select/LocationClimbingZoneSelect";
import DateSelect from "./date-select/DateSelect";
import TechniqueSelect from "./technique-select/TechniqueSelect";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import useSnackbar from "@/hooks/use-snackbar";
import { EToastStatus } from "@/types/enums/EToastStatus";
import { compareDates, getFormattedDateString } from "@/utils/date";
import { fetchChangeSchedule } from "@/api/change-schedule";
import { Database } from "@/types/_supabase";
import { calculateNextScheduleChange } from "@/utils/schedule";

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
  onAddChallenge: (challenge: Challenge) => void;
}

export default function AddChallenge({ locations, climbingZones, techniques, grades, onAddChallenge }: AddChallengeProps){
  const supabase = useSupabaseClient<Database>();
  const session = useSession();
  const showToast = useSnackbar();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const today = getFormattedDateString(new Date());

  const [startDate, setStartDate] = useState<string>(today);
  const [grade, setGrade] = useState<string>(null);
  const [location, setLocation] = useState<string>(locations[0].id);
  const [climbingZone, setClimbingZone] = useState<string>(null);
  const [zoneChangeSchedule, setZoneChangeSchedule] = useState<Partial<ChangeSchedule>>(null);
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
  const [errorMessages, setErrorMessages] = useState<FormErrors>({});

  useEffect(() => {
    async function fetchZoneChangeSchedule(): Promise<void> {
      const changeSchedule = await fetchChangeSchedule(climbingZone);
      setZoneChangeSchedule(changeSchedule);
    }
    if (climbingZone) {
      fetchZoneChangeSchedule();
    }
  }, [climbingZone]);

  function closeMenu(): void {
    resetFormValues();
    onClose();
  }

  function getChallengeEndDate(startDate: string): Date {
    const scheduleStartDate: Date = new Date(zoneChangeSchedule.schedule_start_date);
    const challengeStartDate: Date = new Date(startDate);
    return calculateNextScheduleChange(scheduleStartDate, challengeStartDate, zoneChangeSchedule.change_interval_weeks);
  }

  function validateForm(): boolean {
    const errors: FormErrors = {};

    if (!startDate) {
      errors.startDate = "Start date is required";
    }

    if (compareDates(startDate, today) > 0) {
      errors.startDate = "Start date cannot be in the future";
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
    setErrorMessages(hasErrors ? errors : {});

    return !hasErrors;
  }

  function resetFormValues(): void {
    setStartDate(today);
    setGrade(null);
    setLocation(locations[0].id);
    setClimbingZone(null);
    setZoneChangeSchedule(null);
    setSelectedTechniques([]);
  }

  async function submitForm(): Promise<void> {
    if (!validateForm()) {
      return;
    }

    if (!zoneChangeSchedule) {
      showToast(EToastStatus.ERROR, "Error creating challenge. Could not fetch climbing zone change schedule");
      return;
    }

    const scheduleChangeDate: Date = getChallengeEndDate(startDate);
    const challengeEndDate: string = getFormattedDateString(scheduleChangeDate);

    const formData: CreateChallenge = {
      user_id: session?.user.id,
      climbing_zone: climbingZone,
      grade: grade,
      location: location,
      start_date: startDate,
      end_date: challengeEndDate,
      techniques: selectedTechniques
    };

    const { data, error } = await supabase
      .from("challenge")
      .insert<CreateChallenge>(formData)
      .select()
      .single<Challenge>();

    if (error) {
      showToast(EToastStatus.ERROR, "Challenge creation failed", error.message);
    }

    if (data) {
      showToast(EToastStatus.SUCCESS, "Challenge created!");
      onAddChallenge(data);
      closeMenu();
    }
  }

  return (
    <Flex my={4}>
      <Button w="100%" onClick={onOpen}>
        Add challenge
      </Button>
      <Modal isOpen={isOpen} onClose={closeMenu}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add challenge</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {session ? (
              <Stack spacing={4}>
                <DateSelect
                  label="Select start day"
                  defaultValue={today}
                  maxValue={today}
                  setDate={(date) => setStartDate(date)}>
                  {errorMessages.startDate && <Text variant="error">{errorMessages.startDate}</Text>}
                </DateSelect>
                <GradeSelect grades={grades} setGrade={(grade) => setGrade(grade)}>
                  {errorMessages.grade && <Text variant="error">{errorMessages.grade}</Text>}
                </GradeSelect>
                <LocationClimbingZoneSelect
                  defaultLocation={locations[0]}
                  locations={locations}
                  climbingZones={climbingZones}
                  setLocation={(location) => setLocation(location)}
                  setClimbingZone={setClimbingZone}>
                  {errorMessages.location && <Text variant="error">{errorMessages.location}</Text>}
                  {errorMessages.climbingZone && <Text variant="error">{errorMessages.climbingZone}</Text>}
                </LocationClimbingZoneSelect>
                <TechniqueSelect techniques={techniques} setSelectedTechniques={setSelectedTechniques} />
              </Stack>
            ) : (
              <Text variant="error">You need to be logged in to add a challenge</Text>
            )}
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
}
