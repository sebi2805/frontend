import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    body: "Montserrat",
  },
  styles: {
    global: (props: any) => ({
      "html, body": {
        bg: "darkThemeGrey.600",
        color: props.colorMode === "dark" ? "darkThemeGrey.100" : "black",
      },

      "*": {
        ".slick-prev:before,.slick-next:before": {
          color: "blue.400",
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
          color:
            props.colorMode === "dark" ? "darkThemeGrey.700" : "neutralGrey",
        },
        "&::-webkit-scrollbar": {
          width: "5px",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": {
          background: "white",
          border: `1px solid ${"blue.400"}`,
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "blue.400",
          borderRadius: "10px",
        },
      },
    }),
  },
  colors: {
    purple: {
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
  },
});
