import Head from "next/head";
import { type ReactNode } from "react";
import Navbar from "~/components/Navbar";

type LayoutProps = {
  pageTitle?: string;
  navbarDisabled?: boolean;
  children?: ReactNode;
};

export default function Layout({ pageTitle = "Climbing App", navbarDisabled, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col min-h-screen bg-background">
        <div className="flex flex-auto items-center justify-center p-6 pb-8 mb-[60px] overflow-hidden">{children}</div>
        {!navbarDisabled && <Navbar />}{" "}
      </main>
    </>
  );
}
