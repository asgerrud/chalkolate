import * as React from "react";
import { useCallback, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/lib/api";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { DatePicker } from "~/components/ui/datepicker";
import dayjs from "dayjs";
import { useToast } from "~/components/ui/use-toast";
import { type Grades } from "~/server/api/routers/grade";
import { type ClimbingLocations } from "~/server/api/routers/location";
import { ChallengeCreateInputSchema } from "~/server/api/routers/challenge";

interface CreateChallengeFormProps {
  locations: ClimbingLocations["data"];
  grades: Grades["data"];
}

export default function CreateChallengeForm({ locations, grades }: CreateChallengeFormProps) {
  const [open, setOpen] = useState(false);

  function handleFormSubmit() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Create challenge</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create challenge</DialogTitle>
        </DialogHeader>
        <FormComponent locations={locations} grades={grades} onFormSubmitted={handleFormSubmit} />
      </DialogContent>
    </Dialog>
  );
}

interface FormComponentProps extends CreateChallengeFormProps {
  onFormSubmitted: () => void;
}

function FormComponent({ locations, grades, onFormSubmitted }: FormComponentProps) {
  const { toast } = useToast();

  const today = new Date();
  const getChallengeEndDate = (date: Date) => dayjs(date).add(6, "week").toDate();

  const form = useForm<ChallengeCreateInputSchema>({
    resolver: zodResolver(ChallengeCreateInputSchema),
    defaultValues: {
      startDate: today,
      endDate: getChallengeEndDate(today)
    }
  });

  const watchLocation = form.watch("location");
  const watchGrade = form.watch("grade");
  const createChallenge = api.challenge.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Challenge created!"
      });
      onFormSubmitted();
    }
  });

  function onSubmit(formData: ChallengeCreateInputSchema) {
    const parsedFormData = {
      ...formData,
      startDate: formData.startDate,
      endDate: formData.endDate
    };

    createChallenge.mutate(parsedFormData);
  }

  const getZonesByLocation = useCallback(() => {
    const location = locations?.find((location) => location.id === watchLocation);

    if (location) {
      return location.zone;
    } else {
      return [];
    }
  }, [watchLocation]);

  return (
    <Form {...form}>
      <input type="file" accept="image/*" capture="environment" />

      <form className="flex flex-col space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start date</FormLabel>
              <FormDescription>The day you began the challenge</FormDescription>
              <DatePicker
                field={field}
                onSelect={(date) => {
                  form.setValue("endDate", getChallengeEndDate(date));
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Input type="hidden" {...form.register("endDate")} />

        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select climbing gym" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locations?.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!watchLocation}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select climbing zone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getZonesByLocation().map((zone) => (
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
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {grades?.map((grade) => {
                  const gradeId = String(grade.id);
                  const colorHighlighted = watchGrade === undefined || watchGrade === gradeId;

                  return (
                    <div
                      key={grade.id}
                      className="flex max-h-16 aspect-square rounded-md justify-center transition-opacity duration-75 cursor-pointer"
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
          )}></FormField>

        <Button type="submit">
          {!form.formState.isSubmitting ? <span>Submit</span> : <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
