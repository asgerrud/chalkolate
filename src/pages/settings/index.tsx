import Layout from "~/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { DeleteAccountButton } from "~/components/settings/DeleteAccountButton";
import { api } from "~/lib/api";
import { signOut } from "next-auth/react";
import { requireAuth } from "~/lib/requireAuth";
import { useToast } from "~/components/ui/use-toast";

export function SettingsPage() {
  const { toast } = useToast();

  const deleteAccount = api.account.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Your account was successfully deleted",
        variant: "destructive"
      });
      return signOut();
    }
  });

  function handleAccountDelete() {
    deleteAccount.mutate();
  }

  return (
    <Layout>
      <Card className="max-w-[480px] w-full px-6">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <DeleteAccountButton onConfirmDelete={handleAccountDelete} />
        </CardContent>
      </Card>
    </Layout>
  );
}

export const getServerSideProps = requireAuth(() => {
  return { props: {} };
});

export default SettingsPage;
