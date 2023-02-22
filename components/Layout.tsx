import Head from "next/head";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { Center, Flex } from "@chakra-ui/react";

type LayoutProps = {
  pageTitle?: string;
  children: ReactNode;
};

const Layout = ({ pageTitle = "Climbing App", children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex as="main" flexDirection="column" minH="100vh">
        <Navbar />
        <Center flex={1}>{children}</Center>
      </Flex>
    </>
  );
};

export default Layout;
