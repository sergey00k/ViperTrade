import { Button, useDisclosure } from "@chakra-ui/react";
import WalletSelector from "./WalletSelector";
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-browser";
import { BasicWallet } from "cardano-web-bridge-wrapper";

export default function WalletConnectButton(props: {
  text?: string;
  onWalletChange: (wallet: BasicWallet) => void;
  lib: typeof CardanoSerializationLib;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button fontFamily={'Syne'} fontSize={{ base: "0.8rem", md: "1rem", lg: "1rem", xl: "1.4rem" }} fontWeight={'bold'} backgroundColor="#B1232F" width={'67%'} height={'15.4%'} color='white' rounded={0} _hover={{backgroundColor: "#B82E3D",textDecoration: 'none' }} onClick={onOpen}> {/* normal sizing --------> fontSize={{ base: "0.9rem", md: "1.20rem", lg: "1.40rem", xl: "1.7rem" }}*/}
        {props.text ? props.text : "CONNECT"}
      </Button>
      <WalletSelector
        lib={props.lib}
        onWalletChange={props.onWalletChange}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
