import Layout from "~/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { DeleteAccountButton } from "~/components/settings/DeleteAccountButton";

export function SettingsPage() {
  return (
    <Layout>
      <Card className="max-w-[480px] w-full px-6">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <DeleteAccountButton />
        </CardContent>
      </Card>
    </Layout>
  );
}

export default SettingsPage;
