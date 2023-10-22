import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Loader2 } from "lucide-react";
import { Button } from "react-day-picker";
import { useForm, Form } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage, FormControl, FormDescription } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { ChallengeCreateInputSchema } from "~/schema/challenge.schema";
import { Grades } from "~/server/api/routers/grade";
import { ZonesByLocation } from "~/server/api/routers/zone";
import { getChallengeEndDate } from "~/util/Challenge.util";
import ImageUpload from "./ImageUpload";

interface FormComponentProps {
  locationId: string;
  zones: ZonesByLocation;
  grades: Grades;
  onFormSubmit: (formData: ChallengeCreateInputSchema) => void;
}

export function CreateChallengeForm({ locationId, zones, grades, onFormSubmit }: FormComponentProps) {
  const today = new Date();

  const form = useForm<ChallengeCreateInputSchema>({
    resolver: zodResolver(ChallengeCreateInputSchema),
    defaultValues: {
      location: locationId,
      startDate: today
    }
  });

  const watchGrade = form.watch("grade");

  const getZoneById = (zoneId: string) => zones.find((zone) => zone.id === zoneId);

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
              <ImageUpload
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
                  form.setValue("endDate", getChallengeEndDate(getZoneById(zoneId), today));
                }}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select climbing zone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* get zones */}
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
