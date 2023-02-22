import Layout from "@/components/Layout";
import Link from "next/link";
import LoginButton from "@/components/LoginButton";

const ProfilePage = () => {
  return (
    <Layout>
      <Link href="/">Home</Link>
      <LoginButton />
    </Layout>
  );
};

export default ProfilePage;
