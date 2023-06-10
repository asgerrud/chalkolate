import { createMultiStyleConfigHelpers, extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { accordionAnatomy, cardAnatomy } from "@chakra-ui/anatomy";

const cardTheme = createMultiStyleConfigHelpers(cardAnatomy.keys).defineMultiStyleConfig({
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

const accordionTheme = createMultiStyleConfigHelpers(accordionAnatomy.keys).defineMultiStyleConfig({
  variants: {
    flat: {
      button: {
        background: "secondary.500",
        borderRadius: "md",
        border: "none",
        fontWeight: 500,
        minHeight: "40px",
        _hover: {
          background: "secondary.600"
        }
      },
      container: {
        border: "none"
      }
    }
  }
});

const extendedTheme = extendTheme(
  {
    config: {
      initialColorMode: "light",
      useSystemColorMode: false
    },
    colors: {
      primary: {
        500: "#20b887",
        600: "#118968"
      },
      secondary: {
        500: "#ebebeb",
        600: "#dbdbdb"
      },
      white: "#FFFFFF",
      background: "#f7f7f7",

      lightGreen: "#e0eeee",
      black: "#1e293a"
    },
    components: {
      Accordion: accordionTheme,
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
