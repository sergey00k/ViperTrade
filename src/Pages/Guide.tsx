import {
    Tag,
    Box,
    Spacer,
    Flex,
    VStack,
    HStack,
    Center,
    Text,
    Heading,
    Input,
    Collapse,
    Container,
    TextProps,
    useColorModeValue,
  } from "@chakra-ui/react";
  import Copy from "../components/Copy";
  import React from "react";
  import { Link } from "../components/Icons";
  import * as ListExtra from "../Util/ListExtra";
  import * as MapExtra from "../Util/MapExtra";
  import TextLink from "../components/TextLink";
  import { useSearchParams } from "react-router-dom";
  import { Ghost } from "../components/ChakraKawaii";
  import Theme from "../Theme";
  import { CaretDown, CaretUp } from "../components/Icons";
  import ToolTip from "../components/ToolTip";

  // <------------- image imports ------------- >
import backgroundImg from "../assets/img/viper/viper-background-img.png";
import mobileHeroLight from "../assets/img/hero/mobile.jpg";
import mobileHeroDark from "../assets/img/hero/mobile-dark.jpg";
import desktopHeroLight from "../assets/img/hero/desktop.jpeg";
import desktopHeroDark from "../assets/img/hero/desktop-dark.jpg";
  
  export default function Guide() {

    return (
        <Box
            bgImage={backgroundImg} 
            bgSize="cover"
            bgPosition="center"
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            paddingTop={20}
        >

        </Box>
    )
  }
