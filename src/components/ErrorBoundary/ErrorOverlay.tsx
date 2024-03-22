import {
  VStack,
  Text,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box
} from "@chakra-ui/react";
import CopyCard from "../CopyCard";
import * as Icons from "../Icons";

////////image imports //////////////
import backgroundImg from "../../assets/img/viper/viper-background-img.png";

export default function ErrorOverlay(props: { error: any; title: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <IconButton
        variant={"ghost"}
        colorScheme="failure"
        aria-label="Unmute"
        icon={<Icons.Error />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <VStack spacing={1}>
                <Text fontWeight={"bold"} color={'white'} maxW={300} textAlign={"center"}>
                  Please, report the error by copying the error below and post
                  it to the appopriate channel on discord.
                </Text>
              </VStack>
              <CopyCard value={props.error}></CopyCard>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
