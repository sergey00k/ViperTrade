import { Heading, VStack, Text, Spacer, Box } from "@chakra-ui/react";
import React from "react";
import { Browser } from "../ChakraKawaii";
import CopyCard from "../CopyCard";
import colors from "../../Theme/colors";
import ErrorBoundary from "./ErrorBoundary";

////////image imports //////////////
import backgroundImg from "../../assets/img/viper/viper-background-img.png";

export default class PageErrorBoundary extends ErrorBoundary {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box
        bgImage={backgroundImg} 
        bgSize="cover"
        bgPosition="center"
        minHeight="100vh"
        flex={1}
        width={'100%'}
        height={'100%'}
        paddingTop={120}
        px={420}
        >
          <Spacer></Spacer>
          <VStack spacing={8}>
            <Heading fontFamily={'syne'} color={'white'}>The app crashed!</Heading>
            <VStack spacing={2}>
              <Browser size={200} mood="ko" color={colors.failure.default} />
              <VStack spacing={1}>
                <Text fontFamily={'syne'} color={'white'} fontWeight={"bold"} maxW={300} textAlign={"center"}>
                  Please, report the error by copying the error below and post
                  it to the appopriate channel on discord.
                </Text>
              </VStack>
            </VStack>
            <CopyCard value={this.state.error}></CopyCard>
          </VStack>
        </Box>
      );
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}
