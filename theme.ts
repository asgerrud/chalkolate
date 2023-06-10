import { createMultiStyleConfigHelpers, extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { cardAnatomy } from "@chakra-ui/anatomy";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys);


const cardTheme = defineMultiStyleConfig({
  baseStyle: {
    container: {
      width: "100%",
      maxWidth: "480px"
    },
    header: {
      paddingBottom: 0
    }
  }
});

const extendedTheme = extendTheme(
  {
    colors: {
      primary: {
        500: "#20b887",
        600: "#118968"
      },
      white: "#FFFFFF",
      background: "#f7f7f7",
      lightGreen: "#e0eeee",
      black: "#1e293a"
    },
    config: {
      initialColorMode: "light",
      useSystemColorMode: false
    },
    components: {
      Card: cardTheme,
      Text: {
        variants: {
          error: {
            color: "red.500",
            mt: 2
          }
        }
      }
    }
  },
  withDefaultColorScheme({
    colorScheme: "primary"
  })
);

export default extendedTheme;
