import { type Grades } from "~/server/api/routers/grade";
import * as React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/api";
import { useToast } from "~/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { ChallengeCreateInputSchema } from "~/schema/challenge.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import ImageUpload from "~/components/profile/gym-challenges-card/create-challenge-form-dialog/ImageUpload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { CopyPlus, Loader2 } from "lucide-react";
import { type ZonesByLocation } from "~/server/api/routers/zone";
import { Input } from "~/components/ui/input";
import { getChallengeEndDate } from "~/util/Challenge.util";
import { Card } from "~/components/ui/card";
import { type LocationWithUserChallenges } from "~/server/api/routers/challenge";

interface CreateChallengeFormProps {
  location: LocationWithUserChallenges;
  grades: Grades;
  zones: ZonesByLocation;
}

export function CreateChallengeButton({ location, zones, grades }: CreateChallengeFormProps) {
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const createChallenge = api.challenge.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Challenge created!"
      });
      setOpen(false);
    }
  });

  function handleFormSubmit(parsedFormData: ChallengeCreateInputSchema) {
    createChallenge.mutate(parsedFormData);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="min-h-[278px] bg-gray-200 text-gray-600 border-4 border-gray-400 border-dotted cursor-pointer">
          <div className="flex flex-col h-full p-8 justify-center items-center text-md font-medium transition duration-200 hover:scale-[97%]">
            <CopyPlus size="2.5rem" />
            <div className="mt-2">Create challenge</div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create challenge</DialogTitle>
        </DialogHeader>
        <FormComponent location={location} zones={zones} grades={grades} onFormSubmit={handleFormSubmit} />
      </DialogContent>
    </Dialog>
  );
}

interface FormComponentProps {
  location: LocationWithUserChallenges;
  zones: ZonesByLocation;
  grades: Grades;
  onFormSubmit: (formData: ChallengeCreateInputSchema) => void;
}
function FormComponent({ location, zones, grades, onFormSubmit }: FormComponentProps) {
  const today = new Date();

  const form = useForm<ChallengeCreateInputSchema>({
    resolver: zodResolver(ChallengeCreateInputSchema),
    defaultValues: {
      location: location.id,
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
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {grades?.map((grade) => {
                  const gradeId = String(grade.id);
                  const colorHighlighted = watchGrade === undefined || watchGrade === gradeId;

                  return (
                    <div
                      key={grade.id}
                      className="flex max-h-16 aspect-square rounded-md justify-center duration-75 hover:scale-105 transition cursor-pointer"
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
          {!form.formState.isSubmitting ? <span>Submit</span> : <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
