import { Center, Box, VStack, Text, Heading, Flex, Image } from "@chakra-ui/react";
import React, { useState, useEffect } from 'react';
import { keyframes } from "@emotion/react"

import ViperLogo from "./Logo";
import swapPng from "../assets/img/viper/swap-min.png"

import FireAnimation from "../components/FireAnimationLogo"

function Header() {
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
    <VStack justifyContent={'space-between'}  marginTop={'-10%'}>
        <VStack marginTop={'-2.4%'} spacing={0} position={'absolute'} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <Box zIndex={2} position={'relative'}>
            <ViperLogo boxSize="140px"/>
          </Box>
          <Box zIndex={1} width={'50%'} position={'relative'} bottom={20} marginTop={-50} {...(isHovered ? { opacity: 0, animation: `${fadeInKeyframes} 0.5s forwards`} : { opacity: 1, animation: `${fadeOutKeyframes} 0.7s forwards` })}>
            <Box {...(isVisible ? { opacity: 1 } : { opacity: 0 })}>
              <FireAnimation />
            </Box>
          </Box>
        </VStack>
      <Heading  color={'white'} position={'absolute'} top={185} fontFamily={'syne'} fontWeight={'bold'} fontSize={{ base: "1rem", md: "1.4rem", lg: "1.6rem", xl: "2.21rem" }}>
        VIPERTRADE {/* position={'relative'} top={-15}*/}
      </Heading>
      <Text color={'white'} position={'absolute'} top={227} fontFamily={'syne'} fontWeight={'bold'} textAlign={"center"} fontSize={{ base: "0.5rem", md: "0.8rem", lg: "1rem", xl: "1.18rem" }}>
        Peer-To-Peer Trades Done Right {/*position={'relative'} top={-21} */}
      </Text>
      <Image  src={swapPng} position={'absolute'} top={264} height={12}/> {/* position={'relative'} top={-19} */}
    </VStack>
  );
}

export default Header;
