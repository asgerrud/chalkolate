import Layout from "~/components/Layout";
import { requireAuth } from "~/utils/requireAuth";

export function ProfilePage() {
  return <Layout>Profile</Layout>;
}

export const getServerSideProps = requireAuth(() => {
  return { props: {} };
});

export default ProfilePage;
