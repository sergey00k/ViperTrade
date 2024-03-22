import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { Lock, Unlock } from "../../components/Icons";
import ToolTip from "../../components/ToolTip";

type LockAndSignProps = {
  isAdaForFee: boolean | undefined;
  isMatching: boolean;
  isLocked: boolean;
  theyAreLocked: boolean;
  onLock: () => void;
  onUnlock: () => void;
  onSign: () => void;
};

export default function LockAndSign(props: LockAndSignProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const lockIcon = (b: boolean) => {
    if (b) {
      return (
        <ToolTip label="Assets are locked">
          <Box>
            <Lock fontSize={24} />
          </Box>
        </ToolTip>
      );
    } else {
      return (
        <ToolTip label="Assets are unlocked">
          <Box>
            <Unlock fontSize={24} />
          </Box>
        </ToolTip>
      );
    }
  };

  return (
    <VStack marginTop={170}>
      <HStack>
        {lockIcon(props.isLocked)}
        {props.isLocked ? (
          <Button
            onClick={props.onUnlock}
            borderColor={'#521D51'}
            borderWidth={2}
            width={122} height={33} fontFamily={'Syne'} fontSize={{ base: "0.72rem", md: "1rem", lg: "1.16rem", xl: "1.3rem" }} fontWeight={'bold'} backgroundColor="transparent" color='white' rounded={0} _hover={{backgroundColor: "#7C3A7A",textDecoration: 'none' }}
          >
            UNLOCK
          </Button>
        ) : (
          <Button onClick={props.onLock} width={122} height={33} fontFamily={'Syne'} fontSize={{ base: "0.72rem", md: "1rem", lg: "1.16rem", xl: "1.3rem" }} fontWeight={'bold'} backgroundColor="#521D51" color='white' rounded={0} _hover={{backgroundColor: "#7C3A7A",textDecoration: 'none' }}>
            LOCK
          </Button>
        )}
        {lockIcon(props.theyAreLocked)}
      </HStack>
      <Button width={122} height={33} fontFamily={'Syne'} fontSize={{ base: "0.72rem", md: "1rem", lg: "1.16rem", xl: "1.3rem" }} fontWeight={'bold'} backgroundColor="#B1232F" color='white' rounded={0} _hover={{backgroundColor: "#B82E3D",textDecoration: 'none' }}
        disabled={!props.isLocked || !props.isMatching || !props.isAdaForFee}
        isLoading={isLoading}
        loadingText="Creating Tx"
        onClick={() => {
          setIsLoading(true);
          props.onSign();
          setIsLoading(false);
        }}
      >
        SIGN
      </Button>
    </VStack>
  );
}
