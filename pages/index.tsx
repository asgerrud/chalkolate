import Layout from "@/components/Layout";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <Layout>
      <a href="/profile">profile</a>
      <LoginButton></LoginButton>
    </Layout>
  );
}
