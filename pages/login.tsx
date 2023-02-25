import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { EPageRoute } from "@/types/enums/EPageRoute";
import { Card } from "@chakra-ui/card";
import { Container, Flex } from "@chakra-ui/react";
import Layout from "@/components/Layout";

const LoginPage = () => {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (session?.user.id) {
      router.push(EPageRoute.PROFILE);
    }
  });

  return (
    <Layout>
      <Container>
        <Flex justifyContent="center" alignItems="center">
          <Card p={4} w="100%">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={["google", "github"]}
            />
          </Card>
        </Flex>
      </Container>
    </Layout>
  );
};

export default LoginPage;
