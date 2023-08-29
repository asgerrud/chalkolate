import { Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChallengeCreateInputSchema } from "~/schema/challenge.schema";
import { GRADES, LOCATIONS, ZONES } from "../../prisma/data";
import dayjs from "dayjs";

export function NewChallengeForm() {
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
  function getLocationZones(_location) {
    return ZONES[_location] ?? [];
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
            {LOCATIONS.map((location) => (
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
            {getLocationZones(watchLocation).map(({ name: zoneName }) => (
              <option key={zoneName} value={zoneName}>
                {zoneName}
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
            {GRADES.map(({ name: gradeName }) => (
              <option key={gradeName} value={gradeName}>
                {gradeName}
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
