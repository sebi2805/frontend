import { extendTheme } from "@chakra-ui/react";
import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  track: {
    bg: "purple.100",
    _checked: {
      bg: "purple.500",
    },
  },
});

export const switchTheme = defineMultiStyleConfig({ baseStyle });
export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    light: "'Kalam', cursive",
    night: "'Orbitron', sans-serif",
  },
  components: { Switch: switchTheme },
  styles: {
    global: (props: any) => ({
      "html, body": {
        bg: "purple.1",
        color: "purple.500",
        fontFamily: "night",
      },

      "*": {
        ".slick-prev:before,.slick-next:before": {
          color: "purple.400",
          margin: "5px",
        },

        ".slick-track": {
          marginLeft: 0,
          display: "flex",
        },

        "input[type=file]::-webkit-file-upload-button": {
          cursor: "pointer",
        },
        "::placeholder": {
          color: "darkThemeGrey.700",
        },
        "&::-webkit-scrollbar": {
          width: "5px",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": {
          background: "white",
          border: `1px solid ${"purple.400"}`,
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "purple.400",
          borderRadius: "10px",
        },
      },
    }),
  },
  colors: {
    purple: {
      1: "#FEFDFD",
      10: "#E7D7DB",
      100: "#D3B7C5",
      200: "#BF97B5",
      300: "#A978AA",
      400: "#5C3B7E",
      500: "#301E67",
      600: "#35175B",
      700: "#360B3F",
      800: "#30072F",
    },
    blue: {
      10: "#ADEBF6",
      100: "#9BDFF0",
      200: "#8BD1E8",
      300: "#70B1D4",
      400: "#5B8FB9",
      500: "#4E7BA4",
      600: "#355577",
      700: "#294260",
      800: "#1E3048",
    },
    darkGreen: {
      10: "#EBF8F4",
      100: "#B6EADA",
      200: "#8FC3B3",
      300: "#7CAF9F",
      400: "#588577",
      500: "#588577",
      600: "#476F63",
      700: "#37584E",
      800: "#274039",
    },
    pink: {
      10: "#FEF2FE",
      100: "#FEE4FE",
      200: "#FEDDFE",
      300: "#FFCEFE",
      400: "#E7B8E7",
      500: "#B78EB7",
      600: "#9F799F",
      700: "#886588",
      800: "#705270",
      900: "#402D40",
    },
    lightGreen: {
      1: "#FCFFFA",
      10: "#F0FBE9",
      100: "#E3F8D5",
      200: "#D6F5C0",
      300: "#BCE99B",
      400: "#AFDE8D",
      500: "#95BF72",
      600: "#88AF65",
      700: "#7B9F59",
      800: "#6E8F4D",
      900: "#628043",
    },
    grey: {
      100: "#f3f3f3",
      200: "#dcdcdc",
      300: "#c5c5c5",
      400: "#aeaeae",
      500: "#404040",
      600: "#282828",
      700: "#181818",
      800: "#121212",
    },
    red: {
      10: "#FFF0F5",
      100: "#FFC8DC",
      200: "#FFA0C4",
      300: "#FE78AB",
      400: "#F95093",
      500: "#F2287C",
      600: "#E90064",
      700: "#D0002A",
      800: "#B40000",
      900: "#8E0800",
    },
  },
});
