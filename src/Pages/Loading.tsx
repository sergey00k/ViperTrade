import { Center, Text, Spinner, VStack } from "@chakra-ui/react";
import backgroundImg from "../assets/img/viper/viper-background-img.png";

export default function Loading(): JSX.Element {
  return (
    <Center height={"100vh"}       bgImage={backgroundImg} 
    bgSize="cover"
    bgPosition="center">
      <VStack>
        <Spinner color="black" size="xl" thickness="8px" />
        <Text fontSize={12} fontWeight={"bold"}>
          LOADING...
        </Text>
      </VStack>
    </Center>
  );
}
