import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ChallengeCreateInputSchema } from "~/schema/challenge.schema";
import { getChallengeEndDate } from "~/util/Challenge.util";
import CreateChallengeDialogImageUpload from "./CreateChallengeDialogImageUpload";
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { type ZoneWithChangeSchedule } from "~/server/api/routers/zone";
import { type Grade } from ".prisma/client";

interface CreateChallengeDialogFormProps {
  locationId: string;
  zones: ZoneWithChangeSchedule[];
  grades: Grade[];
  onFormSubmit: (formData: ChallengeCreateInputSchema) => void;
}

export function CreateChallengeDialogForm({ locationId, zones, grades, onFormSubmit }: CreateChallengeDialogFormProps) {
  const today = new Date();

  const form = useForm<ChallengeCreateInputSchema>({
    resolver: zodResolver(ChallengeCreateInputSchema),
    defaultValues: {
      location: locationId,
      startDate: today
    }
  });

  const watchGrade = form.watch("grade");

  const getZoneById = (zoneId: string) => zones.find((zone: ZoneWithChangeSchedule) => zone.id === zoneId);

  const onSubmit = (formData: ChallengeCreateInputSchema) => {
    onFormSubmit(formData);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="imageUrl"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>Route image</FormLabel>
              <CreateChallengeDialogImageUpload
                autoOpen={true}
                onImageUploaded={(fileUrl) => {
                  form.setValue("imageUrl", fileUrl);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="zone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zone</FormLabel>
              <Select
                defaultValue={field.value}
                onValueChange={(zoneId: string) => {
                  field.onChange(zoneId);
                  const changeSchedule = getZoneById(zoneId).changeSchedule;
                  form.setValue("endDate", getChallengeEndDate(changeSchedule, today));
                }}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select climbing zone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {zones?.map((zone) => (
                    <SelectItem key={zone.id} value={zone.id}>
                      {zone.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="grade"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <FormDescription>The color grade of the problem</FormDescription>
              <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
                {grades?.map((grade) => {
                  const gradeId = String(grade.id);
                  const colorHighlighted = watchGrade === undefined || watchGrade === gradeId;

                  return (
                    <div
                      key={grade.id}
                      className="flex justify-center transition duration-75 rounded-md cursor-pointer max-h-16 aspect-square hover:scale-105"
                      style={{ backgroundColor: grade.hex, opacity: colorHighlighted ? "1" : "0.35" }}
                      onClick={() => {
                        if (watchGrade === gradeId) {
                          form.resetField(field.name);
                        } else {
                          form.setValue(field.name, gradeId);
                        }
                      }}
                    />
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Input type="hidden" {...form.register("endDate")} />

        <Button type="submit">
          {!form.formState.isSubmitting ? <span>Submit</span> : <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
