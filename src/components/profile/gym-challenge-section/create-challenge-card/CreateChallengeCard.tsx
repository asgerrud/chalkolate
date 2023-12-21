import { api } from "~/lib/api";
import { useToast } from "~/components/ui/use-toast";
import { type ChallengeCreateInputSchema } from "~/schema/challenge.schema";
import { CopyPlus } from "lucide-react";
import { Card } from "~/components/ui/card";
import { CreateChallengeDialog } from "~/components/profile/gym-challenge-section/create-challenge-card/dialog/create-challenge-dialog/CreateChallengeDialog";
import { type Grade } from ".prisma/client";
import { type ZoneWithChangeSchedule } from "~/server/api/routers/zone";

interface CreateChallengeCardProps {
  locationId: string;
  grades: Grade[];
  zones: ZoneWithChangeSchedule[];
  onChallengeCreated: () => void;
}

export function CreateChallengeCard({ locationId, zones, grades, onChallengeCreated }: CreateChallengeCardProps) {
  const { toast } = useToast();

  const createChallenge = api.challenge.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Challenge created!"
      });
      onChallengeCreated();
    }
  });

  function handleFormSubmit(parsedFormData: ChallengeCreateInputSchema) {
    createChallenge.mutate(parsedFormData);
  }

  return (
    <CreateChallengeDialog locationId={locationId} zones={zones} grades={grades} onSubmit={handleFormSubmit}>
      <Card className="min-h-[278px] bg-gray-200 text-gray-600 border-4 border-gray-400 border-dotted cursor-pointer">
        <div className="flex flex-col h-full p-8 justify-center items-center text-md font-medium transition duration-200 hover:scale-[97%]">
          <CopyPlus size="2.5rem" />
          <div className="mt-2">Create challenge</div>
        </div>
      </Card>
    </CreateChallengeDialog>
  );
}
