import { Link, Heading, Image, Spacer, Text, VStack, Box } from "@chakra-ui/react";
import { Browser } from "../components/ChakraKawaii";

//////////////// image imports ///////////////
import backgroundImg from "../assets/img/viper/viper-background-img.png";
import ViperLogo from "../components/Logo";
import { Link as ReachLink } from "react-router-dom";

//////////// animation imports /////////////
import FireAnimation from "../components/FireAnimationLogo"

function Success() {
  return (
    <Box
    bgImage={backgroundImg} 
    bgSize="cover"
    bgPosition="center"
    minHeight="100vh"
    paddingTop={10} //300 paddingBottom={'27%'}
    position={'absolute'}
    top={65}
    left={0}
    right={0}
    bottom={0}
    flex={1}
    height={'100%'}
    >
      <Spacer />
      <VStack>
        <Heading as="h1" size="4xl" color={'white'} fontFamily={'syne'} fontWeight={'bold'}>
          SSSUCCESS!
        </Heading>
        <Link as={ReachLink} to="/home" style={{ textDecoration: 'none' }}> 
          <Box zIndex={2} position={'relative'}>
            <ViperLogo boxSize={'140px'}/>
          </Box>
          <Box zIndex={1} width={'55%'} position={'relative'} bottom={8} marginTop={-50} left={8}>
            <FireAnimation />
          </Box>
        </Link>
        <Box  height={`40%`} justifyContent={'center'} alignItems={'center'} textAlign="center" px={'1.2%'} backgroundColor={"#581F50"} width={'50%'} paddingTop={'1.5%'} paddingBottom={'1.5%'}>
          <Text color={'white'} fontSize={"xl"} fontFamily={'syne'} fontWeight={'bold'}>
          The trade was submitted and is waiting to be added to the blockchain.
          Please, refrain from making any more trades before this one has
          completed.
          </Text>
        </Box>
      </VStack>
      </Box>
  );
}

export default Success;
