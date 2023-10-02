import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";

interface DeleteAccountButtonProps {
  onConfirmDelete: () => void;
}

export function DeleteAccountButton({ onConfirmDelete }: DeleteAccountButtonProps) {
  const session = useSession();

  const accountEmail = session.data?.user?.email;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <p>
            This action <em>cannot</em> be undone. This will permanently delete your account and remove your data
          </p>
          <p>
            Account: <code>{accountEmail}</code>
          </p>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onConfirmDelete}>
            Delete account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
