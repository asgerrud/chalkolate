import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChallengeCreateInputSchema } from "~/schema/challenge.schema";
import { api } from "~/lib/api";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import * as React from "react";
import { useState } from "react";
import { DatePicker } from "~/components/ui/datepicker";
import dayjs from "dayjs";
import { useToast } from "~/components/ui/use-toast";

export function NewChallengeForm() {
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
        <FormComponent onFormSubmitted={handleFormSubmit} />
      </DialogContent>
    </Dialog>
  );
}

interface FormComponentProps {
  onFormSubmitted: () => void;
}

function FormComponent({ onFormSubmitted }: FormComponentProps) {
  const { toast } = useToast();

  const today = new Date();

  const form = useForm<ChallengeCreateInputSchema>({
    resolver: zodResolver(ChallengeCreateInputSchema),
    defaultValues: {
      startDate: today,
      endDate: getChallengeEndDate(today)
    }
  });

  const {
    register,
    formState: { isSubmitting }
  } = form;

  const { data: locations } = api.location.findAll.useQuery();
  const { data: grades } = api.grade.findAll.useQuery();
  const createChallenge = api.challenge.create.useMutation({
    onSuccess: () => {
      // TODO: Close dialog
      toast({
        title: "Challenge created!"
      });
      onFormSubmitted();
    }
  });

  const watchStartDate = form.watch("startDate");
  const watchLocation = form.watch("location");
  const watchGrade = form.watch("grade");

  function getChallengeEndDate(date: Date): Date {
    return dayjs(date).add(6, "week").toDate();
  }

  function onSubmit(formData: ChallengeCreateInputSchema) {
    const parsedFormData = {
      ...formData,
      startDate: formData.startDate,
      endDate: formData.endDate
    };

    createChallenge.mutate(parsedFormData);
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
    <Form {...form}>
      <form className="flex flex-col space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => {
            return (
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
            );
          }}
        />

        <Input type="hidden" {...register("endDate")} />

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
                  {getZonesByLocation(watchLocation).map((zone) => (
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
              <div className="grid grid-cols-2 gap-2">
                {grades?.map((grade) => {
                  const gradeId = String(grade.id);
                  const colorHighlighted = watchGrade === undefined || watchGrade === gradeId;

                  return (
                    <div
                      key={grade.id}
                      className="flex flex-1 h-16 justify-center transition-opacity duration-75 cursor-pointer"
                      style={{ backgroundColor: grade.hex, opacity: colorHighlighted ? "1" : "0.35" }}
                      onClick={() => {
                        if (watchGrade === gradeId) {
                          form.resetField("grade");
                        } else {
                          form.setValue("grade", gradeId);
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
          {!isSubmitting ? <span>Submit</span> : <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
