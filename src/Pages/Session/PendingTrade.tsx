import { Heading, Spacer, Text, VStack, Button, Box } from "@chakra-ui/react";
import { Browser } from "../../components/ChakraKawaii";
import Store from "../../Storage/Store";
import { useEffect, useState, lazy } from "react";

////////image imports //////////////
import backgroundImg from "../../assets/img/viper/viper-background-img.png";
import ViperLogo from "../../components/Logo";

////////animation imports //////////////
const FireAnimation = lazy(() => import("../../components/FireAnimationLogo"));
import { keyframes } from "@emotion/react"

function PendingTrade(props: { store?: Store }) {
  const fadeInKeyframes = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
  ` ;

  const fadeOutKeyframes = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
  ` ;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
  const timer = setTimeout(() => {
    setIsVisible(true);
  }, 500);
  return () => clearTimeout(timer);
  },);

  const [isHovered, setIsHovered] = useState(false);

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
      <Spacer />
      <VStack>
        <VStack onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <Box zIndex={2} position={'relative'} bottom={2}>
            <ViperLogo boxSize={'140px'}/>
          </Box>
          <Box zIndex={1} width={'55%'} position={'relative'} bottom={24} left={0} {...(isHovered ? { opacity: 0, animation: `${fadeInKeyframes} 0.5s forwards`} : { opacity: 1, animation: `${fadeOutKeyframes} 0.7s forwards` })}>
            <FireAnimation />
          </Box>
        </VStack>
        <Heading color={'white'} as="h1" size="xl" fontFamily={'Syne'} fontWeight={'bold'} position={'relative'} top={-20}>
          It seems like you have a pending trade...
        </Heading>
        <Text color={'white'} textAlign={"center"} fontSize={"xl"} maxWidth={600} position={'relative'} top={-20} fontFamily={'Syne'} fontWeight={'bold'}>
          You can not make any more trades until the current one has been
          cleared.
        </Text>
      </VStack>
    </Box>
  );
}

export default PendingTrade;
