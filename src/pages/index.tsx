import Hero from "~/components/Hero";
import Layout from "~/components/Layout";

export default function Home() {
  return (
    <Layout pageTitle="Home" navbarDisabled>
      <Hero />
    </Layout>
  );
}
