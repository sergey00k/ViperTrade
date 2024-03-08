import {
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  VStack,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import * as CIP30 from "cardano-web-bridge-wrapper/lib/CIP30";
import { BasicWallet } from "cardano-web-bridge-wrapper/lib/BasicWallet";
import { Ghost } from "./ChakraKawaii";
import colors from "../Theme/colors";
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-browser";

export default function WalletSelector(props: {
  onWalletChange: (wallet: BasicWallet) => void;
  isOpen: boolean;
  onClose: () => void;
  lib: typeof CardanoSerializationLib;
}) {
  const colorMode = useColorModeValue(
    { bgColor: "background.light" },
    { bgColor: "background.dark" }
  );

  const walletChoices: JSX.Element[] = [];

  for (const property in window.cardano) {
    const api: any = window.cardano[property];
    if (CIP30.isInitalAPI(api)) {
      walletChoices.push(
        <WalletChoice
          lib={props.lib}
          key={api.name}
          api={api}
          onWalletChange={(wallet) => {
            props.onClose();
            props.onWalletChange(wallet);
          }}
        />
      );
    }
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent bgColor={'#121315'}>
        <ModalHeader color={'white'} >Choose Wallet</ModalHeader>
        <ModalCloseButton colorScheme={"whiteAlpha"} />
        <ModalBody>
          <VStack width={"fill"}>
            {walletChoices.length > 0 ? walletChoices : <NoWallet />}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function NoWallet() {
  return (
    <VStack>
      <Ghost mood="shocked" color={colors.characters.ghost}></Ghost>
      <Text>I couldn&apos;t find your wallet!</Text>
    </VStack>
  );
}

function WalletChoice(props: {
  api: CIP30.InitalAPI<any>;
  onWalletChange: (wallet: BasicWallet) => void;
  lib: typeof CardanoSerializationLib;
}) {
  const colorMode = useColorModeValue(
    { bgColor: "#212529" },
    { bgColor: "#212529" }
  );

  return (
    <Flex
      px={8}
      py={4}
      bgColor={colorMode.bgColor}
      cursor={"pointer"}
      onClick={async () => {
        const fullAPI = await props.api.enable();
        props.onWalletChange(new BasicWallet(props.api, fullAPI, props.lib));
      }}
      width={"full"}
      rounded={8}
    >
      <Center>
        <Text color={'white'} fontSize={32} fontWeight={"bold"}>
          {props.api.name.charAt(0).toUpperCase() + props.api.name.slice(1)}
        </Text>
      </Center>
      <Spacer></Spacer>
      <Image width={"40px"} src={props.api.icon}></Image>
    </Flex>
  );
}
