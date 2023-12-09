import { type ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { type ChallengeCreateInputSchema } from "~/schema/challenge.schema";
import { CreateChallengeDialogForm } from "./CreateChallengeDialogForm";
import { type ZoneWithChangeSchedule } from "~/server/api/routers/zone";
import { type Grade } from ".prisma/client";

interface CreateChallengeDialogProps {
  locationId: string;
  grades: Grade[];
  zones: ZoneWithChangeSchedule[];
  onSubmit: (data: ChallengeCreateInputSchema) => void;
  children: ReactNode;
}

export function CreateChallengeDialog({ locationId, zones, grades, onSubmit, children }: CreateChallengeDialogProps) {
  const [open, setOpen] = useState(false);

  function handleFormSubmit(data: ChallengeCreateInputSchema) {
    onSubmit(data);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create challenge</DialogTitle>
        </DialogHeader>
        <CreateChallengeDialogForm
          locationId={locationId}
          zones={zones}
          grades={grades}
          onFormSubmit={handleFormSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
