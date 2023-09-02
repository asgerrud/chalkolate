import { SessionProvider } from "next-auth/react";
import { api } from "~/lib/api";
import "../globals.css";

function ChalkolateApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default api.withTRPC(ChalkolateApp);
