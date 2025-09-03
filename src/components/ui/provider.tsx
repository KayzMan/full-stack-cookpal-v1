"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

import configured_theme from "@/theme";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={configured_theme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
