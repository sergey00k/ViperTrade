import { Center, Heading, Spacer, VStack, Box } from "@chakra-ui/react";
import { Browser } from "../components/ChakraKawaii";

////////image imports //////////////
import backgroundImg from "../assets/img/viper/viper-background-img.png";

export default function NotFound() {
  return (
    <Box
    bgImage={backgroundImg} 
    bgSize="cover"
    bgPosition="center"
    minHeight="100vh"
    flex={1}
    width={'100%'}
    height={'100%'}
    paddingTop={180}
    >
      <Spacer></Spacer>
      <Center>
        <VStack>
          <Browser size={200} mood="sad" color="#E0E4E8"></Browser>
          <Heading size={"xl"}>404 - Page Not Found</Heading>
        </VStack>
      </Center>
    </Box>
  );
}
