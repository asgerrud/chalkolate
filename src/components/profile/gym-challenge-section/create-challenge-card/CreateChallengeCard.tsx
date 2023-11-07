import { type Grades } from "~/server/api/routers/grade";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { api } from "~/lib/api";
import { useToast } from "~/components/ui/use-toast";
import { type ChallengeCreateInputSchema } from "~/schema/challenge.schema";
import { CopyPlus } from "lucide-react";
import { type ZonesByLocation } from "~/server/api/routers/zone";
import { Card } from "~/components/ui/card";
import { CreateChallengeCardForm } from "./CreateChallengeCardForm";

interface CreateChallengeFormProps {
  locationId: string;
  grades: Grades;
  zones: ZonesByLocation;
}

export function CreateChallengeCard({ locationId, zones, grades }: CreateChallengeFormProps) {
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
    // TODO: re-render challenge list on challenge create
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
        <CreateChallengeCardForm
          locationId={locationId}
          zones={zones}
          grades={grades}
          onFormSubmit={handleFormSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
