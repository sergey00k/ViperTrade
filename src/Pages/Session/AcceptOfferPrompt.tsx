import { VStack, Text, Button, Box } from "@chakra-ui/react";
import React from "react";
import * as Icons from "../../components/Icons";
import { DialogBox } from "../../components/DialogBox";

export default function AcceptOfferPrompt(props: {
  onSign: () => void;
  onReject: () => void;
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Box marginTop={44} width={200}>
    <DialogBox icon={<Icons.Info />} headerText="Respond" colorScheme="primary">
      <VStack>
        <Text color={'white'} fontSize={24}>Accept Offer</Text>

        <VStack>
          <Button
            onClick={() => {
              setIsLoading(true);
              props.onSign();
              setIsLoading(false);
            }}
            width={122} height={33} fontFamily={'Syne'} fontSize={{ base: "0.72rem", md: "1rem", lg: "1.16rem", xl: "1.3rem" }} fontWeight={'bold'} backgroundColor="#B1232F" color='white' rounded={0} _hover={{backgroundColor: "#B82E3D",textDecoration: 'none' }}
            isLoading={isLoading}
            loadingText="Creating Tx"
          >
            SIGN
          </Button>

          <Button onClick={props.onReject} borderColor={'#521D51'} borderWidth={2} width={122} height={33} fontFamily={'Syne'} fontSize={{ base: "0.72rem", md: "1rem", lg: "1.16rem", xl: "1.3rem" }} fontWeight={'bold'} backgroundColor="transparent" color='white' rounded={0} _hover={{backgroundColor: "#7C3A7A",textDecoration: 'none' }}>
            REJECT
          </Button>
        </VStack>
      </VStack>
    </DialogBox>
    </Box>
  );
}
