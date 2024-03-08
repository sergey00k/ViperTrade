import type { StyleFunctionProps } from "@chakra-ui/theme-tools";
import defaultTheme from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";
import { ComponentStyleConfig } from "@chakra-ui/react";

const ghostIconButton = (props: StyleFunctionProps) => {
  return {
    ...defaultTheme.components.Button.variants.ghost(props),
    _focus: {
      bg: mode("#B1232F", "#B1232F")(props),
      textDecoration: "none",
    },
    _active: {
      bg: mode("#B1232F", "#B1232F"),
      textDecoration: "none",
    },
    _hover: { bg: mode("#E85E6C", "lighten.200") },
    textDecoration: "none"
  };
};

const button: ComponentStyleConfig = {
  variants: {
    ghost: ghostIconButton,
  },
};

export default button;
