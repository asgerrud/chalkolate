import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import extendedTheme from "../../theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

function ChalkolateApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ColorModeScript initialColorMode={extendedTheme.config.initialColorMode} />
      <ChakraProvider theme={extendedTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default api.withTRPC(ChalkolateApp);
