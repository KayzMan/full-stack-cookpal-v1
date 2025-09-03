import { Heading, Highlight, Stack } from "@chakra-ui/react";

export function Logo() {
  return (
    <Stack>
      <Heading size="4xl" letterSpacing="tight">
        <Highlight query="Cook" styles={{ color: "appColor" }}>
          🍳 CookPal
        </Highlight>
      </Heading>
    </Stack>
  );
}
