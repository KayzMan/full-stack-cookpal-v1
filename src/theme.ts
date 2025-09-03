import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      bg: "bg-canvas",
    },
    body: {
      padding: "4",
    },
  },
  theme: {
    tokens: {
      colors: {
        appColorTint: {
          100: { value: "#FFF0E6" },
          200: { value: "#FFE0CC" },
          300: { value: "#FFD1B3" },
          400: { value: "#FFC299" },
          500: { value: "#FFB380" },
          600: { value: "#FFA366" },
          700: { value: "#FF944D" },
          800: { value: "#FF8533" },
          900: { value: "#FF7519" },
          950: { value: "#FF6600" },
        },
        appColorShade: {
          100: { value: "#FF6600" },
          200: { value: "#E65C00" },
          300: { value: "#CC5200" },
          400: { value: "#B34700" },
          500: { value: "#993D00" },
          600: { value: "#803300" },
          700: { value: "#662900" },
          800: { value: "#4D1F00" },
          900: { value: "#331400" },
          950: { value: "#1A0A00" },
        },
      },
    },
    semanticTokens: {
      colors: {
        // custom background color
        "bg-canvas": {
          value: { _light: "{colors.gray.50}", _dark: "{colors.gray.900}" },
        },
        appColor: {
          value: { _light: "{colors.appColorTint.900}", _dark: "{colors.appColorTint.950}" },
        },
      },
    },
  },
});

export default createSystem(defaultConfig, config);
