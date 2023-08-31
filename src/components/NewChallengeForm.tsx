import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useDisclosure
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChallengeCreateInputSchema } from "~/schema/challenge.schema";
import dayjs from "dayjs";
import { api } from "~/utils/api";

function FormComponent() {
  const { data: locations } = api.location.findAll.useQuery();
  const { data: grades } = api.grade.findAll.useQuery();

  const {
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    handleSubmit
  } = useForm<ChallengeCreateInputSchema>({
    resolver: zodResolver(ChallengeCreateInputSchema)
  });

  const watchLocation = watch("location");

  function onSubmit(formData: ChallengeCreateInputSchema) {
    return new Promise((resolve) => {
      console.log(formData);
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });
  }

  function getZonesByLocation(locationId: string) {
    const location = locations?.find((location) => location.id === locationId);

    if (location) {
      return location.zone;
    } else {
      return [];
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormControl isInvalid={Boolean(errors.startDate)}>
          <FormLabel htmlFor="name">Start date</FormLabel>
          <Input
            type="date"
            {...register("startDate", {
              required: "This is required"
            })}
            onChange={(e) => {
              const endDate = dayjs(e.target.value).add(6, "week").format("YYYY-MM-DD");
              setValue("endDate", endDate);
            }}
          />
          <FormErrorMessage>
            <span>{errors.startDate && errors.startDate.message}</span>
          </FormErrorMessage>
        </FormControl>

        <Input type="hidden" {...register("endDate")} />

        <FormControl isInvalid={Boolean(errors.location)}>
          <FormLabel>Location</FormLabel>
          <Select placeholder="Select location" {...register("location")}>
            {locations?.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            <span>{errors.location && errors.location.message}</span>
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.zone)} isDisabled={!watchLocation}>
          <FormLabel>Zone</FormLabel>
          <Select placeholder="Select zone" {...register("zone")}>
            {getZonesByLocation(watchLocation).map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            <span>{errors.zone && errors.zone.message}</span>
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.grade)}>
          <FormLabel>Grade</FormLabel>
          <Select placeholder="Select grade" {...register("grade")}>
            {grades?.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            <span>{errors.grade && errors.grade.message}</span>
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}

export function NewChallengeForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Create challenge</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create challenge</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box pb={2}>
              <FormComponent />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
