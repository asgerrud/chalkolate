import Layout from "~/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function SettingsPage() {
  return (
    <Layout>
      <Card className="max-w-[480px] w-full px-6">
        <CardHeader>
          <CardTitle>Challenges</CardTitle>
        </CardHeader>
        <CardContent>Delete account</CardContent>
      </Card>
    </Layout>
  );
}

export default SettingsPage;
