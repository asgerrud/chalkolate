import { SessionProvider } from "next-auth/react";
import { api } from "~/lib/api";
import "../globals.css";
import { Toaster } from "~/components/ui/toaster";

function ChalkolateApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  );
}

export default api.withTRPC(ChalkolateApp);
