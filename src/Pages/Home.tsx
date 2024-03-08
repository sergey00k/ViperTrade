import {
  Center,
  Heading,
  Spacer,
  VStack,
  Text,
  Image,
  Button,
  Box,
  Flex,
  Link,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  AspectRatio,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react"
import { Link as ReachLink } from "react-router-dom";
import { ChannelState } from "../Network/Channel";
import { useEffect, useState } from "react";
import * as Icons from "../components/Icons";
import { TbWorld } from "react-icons/tb";

// <------------- image imports ------------- >
import backgroundImg from "../assets/img/viper/viper-background-img.png";
import mobileHeroLight from "../assets/img/hero/mobile.jpg";
import mobileHeroDark from "../assets/img/hero/mobile-dark.jpg";
import desktopHeroLight from "../assets/img/hero/desktop.jpeg";
import desktopHeroDark from "../assets/img/hero/desktop-dark.jpg";
import nftCoin1 from "../assets/img/viper/1.png"
import nftCoin2 from "../assets/img/viper/2.png"
import nftCoin3 from "../assets/img/viper/3.png"
import nftCoin4 from "../assets/img/viper/4.png"
import nftCoin5 from "../assets/img/viper/5.png"
import nftCoin6 from "../assets/img/viper/6.png"
import nftCoin7 from "../assets/img/viper/7.png"
import nftCoin8 from "../assets/img/viper/8.png"
import nftCoin9 from "../assets/img/viper/9.png"

// <------------ animation imports ------------ >
import FireAnimation from "../components/FireAnimation"


export default function Home(props: { channelState: ChannelState }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);

  

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  },);

  const layout: "mobile" | "desktop" | undefined = useBreakpointValue({
    base: "mobile",
    lg: "desktop",
  });
  const mobileHero = useColorModeValue(mobileHeroLight, mobileHeroDark);

  const desktopHero = useColorModeValue(desktopHeroLight, desktopHeroDark);
  
  const floatKeyframes = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
    100% { transform: translateY(0); }
  `;

  const fadeInKeyframes = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
    ` ;

  const fadeOutKeyframes = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
    ` ;

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
    paddingTop={14}
    position={'absolute'}
    top={65}
    left={0}
    right={0}
    bottom={0}
    flex={1}
    height={'100%'}
    >

      <Text fontFamily={'Syne'} fontWeight={'bold'} color={'white'} /*fontSize={105}*/ fontSize={{ base: "3.5rem", md: "4.2rem", lg: "5rem", xl: "6.5rem" }} marginBottom={-5}>VIPERTRADE</Text>
      <Flex marginBottom={55} flexDirection={'row'} align={'center'} justifyContent={'space-between'} width={'100%'} height={600}>

        <Flex justifyContent={'space-between'} p={2} width={'31%'} height={'100%'} flexWrap={'wrap'} zIndex={0.9}>
          <Box animation={`${floatKeyframes} 2s ease-in-out infinite`}>
            <Image m={3} src={nftCoin1} height={240} marginTop={-2}></Image>
          </Box>
          <Box animation={`${floatKeyframes} 2s ease-in-out infinite`}>
            <Image m={3} src={nftCoin3} height={90} marginTop={-2} marginRight={12}></Image>
          </Box>
          <Box animation={`${floatKeyframes} 2s ease-in-out infinite`}>
            <Image m={3} src={nftCoin2} height={170} marginLeft={240} marginTop={-40}></Image>
          </Box>
          <Box animation={`${floatKeyframes} 2s ease-in-out infinite`}>
            <Image m={3} src={nftCoin4} height={170} marginLeft={20} marginTop={-20} style={{ transform: 'rotate(-15deg)' }}></Image>
          </Box>
          <Box animation={`${floatKeyframes} 2s ease-in-out infinite`}>
            <Image m={3} src={nftCoin5} height={120} marginTop={-10} marginLeft={10}></Image>
          </Box>
        </Flex>
        <Flex flexDirection={'column'} justifyContent="space-between" alignItems="center" width={'37%'} height={'100%'} paddingBottom={70}> {/* 490 pbottom*/}
        <VStack alignItems="center" width={'100%'}>
          <Text color={'white'} fontFamily={'Prompt-Light-Italic'} fontSize={{ base: "0.84rem", md: "1.20rem", lg: "1.45rem", xl: "1.95rem" }}>Peer-To-Peer Trades Done Right</Text>
          <Flex justifyContent={'space-between'} width={'100%'}>
            <Link as={ReachLink} to="/session" style={{ textDecoration: 'none', width: '48.5%'  }} height={50}>
              <Button onMouseEnter={onOpen} onMouseLeave={onClose} zIndex={2} /*fontSize={22}*/ fontSize={{ base: "0.9rem", md: "1.20rem", lg: "1.40rem", xl: "1.40rem" }} fontFamily={'Syne'} boxShadow={"none"} fontWeight={'bold'} backgroundColor="#B1232F" color='white' width={'100%'} height={'100%'} textDecoration={'none'} rounded={0} _hover={{ backgroundColor: "#B82E3D", textDecoration: 'none' }}>
                TRADE NOW
              </Button>
                <Box alignItems={'center'} justifyContent={'center'} /*125*/ width={'115%'} zIndex={1} /*-9%*/ marginTop={'-12.5%'} position={'relative'} left={-5} {...(isOpen ? { opacity: 0, animation: `${fadeInKeyframes} 0.5s forwards`} : { opacity: 1, animation: `${fadeOutKeyframes} 0.7s forwards` })}>
                  <Box {...(isVisible ? { opacity: 1 } : { opacity: 0 })}>
                    <FireAnimation />
                  </Box>
                </Box>
            </Link>
            <Link as={ReachLink} to="/guide" height={50} style={{ textDecoration: 'none', width: '48.5%'  }}>
              <Button fontFamily={'Syne'} fontSize={{ base: "0.9rem", md: "1.20rem", lg: "1.40rem", xl: "1.40rem" }} fontWeight={'bold'} backgroundColor="#B1232F" width={'100%'} height={'100%'} color='white' rounded={0} _hover={{backgroundColor: "#B82E3D",textDecoration: 'none' }}>
                HELP
              </Button>
            </Link>
          </Flex>
        </VStack>
        <VStack>
        <HStack spacing={3}>
          <Link as={ReachLink} to="/session">
            <Icons.Discord />
          </Link>
          <Link as={ReachLink} to="/session">
            <Icons.Twitter />
          </Link>
          <Link as={ReachLink} to="/session">
            <TbWorld color={'white'} style={{ fontSize: '30px', marginTop: '-6' }}/>
          </Link>
        </HStack>
        <Text fontSize={12} color={'white'} fontFamily={'Prompt-Light-Italic'}> © 2024 VIPER All Rights Reserved</Text>
        </VStack>
        </Flex>
        <Flex justifyContent={'space-between'} p={2} width={'31%'} height={'100%'} flexWrap={'wrap'}>
          <Box animation={`${floatKeyframes} 2s ease-in-out infinite`}>
            <Image m={3} src={nftCoin7} height={230} marginTop={10} marginBottom={-1}></Image>
          </Box>
          <Box animation={`${floatKeyframes} 2s ease-in-out infinite`}>
            <Image m={3} src={nftCoin8} height={140} marginRight={10}></Image>
          </Box>
          <Box animation={`${floatKeyframes} 2s ease-in-out infinite`}>
            <Image m={3} src={nftCoin6} height={200} marginBottom={160} marginLeft={-5}></Image>
          </Box>
          <Box animation={`${floatKeyframes} 2s ease-in-out infinite`}>
            <Image m={3} src={nftCoin9} height={140} marginTop={-5} marginRight={12} style={{ transform: 'rotate(180deg)' }}></Image>
          </Box>
        </Flex>

      </Flex>
    </Box>

  );
}
// 3 or 7

/*<Link as={ReachLink} to="/session" _hover={{}}>
<Button colorScheme="primary">
  {props.channelState === "Connected" ? "REJOIN" : "Trade now"}
</Button>
</Link>"#B1232F"*/

/*   const floatKeyframes = keyframes({
    "0%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-20px)" },
    "100%": { transform: "translateY(0)" },
  }); 

  animation="float 3s ease-in-out infinite"
  */
