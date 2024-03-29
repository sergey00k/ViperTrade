import {
  Center,
  HStack,
  Button,
  Link,
  Flex,
  Box,
  Spacer,
  Image,
  Text,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Modal,
  useDisclosure,
  Icon,
  IconButton,
  useBreakpointValue,
  Alert,
  VStack,
  AlertIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  useInterval,
  useColorMode,
} from "@chakra-ui/react";
import { Env } from "./Env";
import { Link as ReachLink, Outlet } from "react-router-dom";
import { ChannelState } from "./Network/Channel";
import * as NetworkSession from "./Network/Session";
import * as Icons from "./components/Icons";
import React from "react";
import WalletSelector from "./components/WalletSelector";
import { BasicWallet } from "cardano-web-bridge-wrapper/lib/BasicWallet";
import ToolTip from "./components/ToolTip";
import BlockFrostAPI from "./API/BlockFrost/BlockFrostAPI";
import * as BlockFrostTypes from "./API/BlockFrost/Types";
import ChatBar from "./components/ChatBar";
import ComponentErrorBoundary from "./components/ErrorBoundary/ComponentErrorBoundary";
import ViperLogo from "./components/Logo";
import { usePWAInstall } from "./Hooks/PWA";
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-browser";

///////////// image imports /////////////////
import backgroundImg from "./assets/img/viper/viper-background-img.png"

export default function Layout(props: {
  env: Env;
  session?: NetworkSession.Session;
  lib?: typeof CardanoSerializationLib;
}) {
  const [channelState, setChannelState] =
    React.useState<ChannelState>("Initalized");

  const [isHealthy, setIsHealth] = React.useState<boolean>(true);
  const layout: "vertical" | "horizontal" | undefined = useBreakpointValue({
    base: "vertical",
    sm: "horizontal",
  });

  const checkHealth = async () => {
    try {
      if (props.env.wallet !== undefined) {
        const networkId = await props.env.wallet.getNetworkId();
        const API = new BlockFrostAPI(networkId);
        const health = await API.health();
        if (BlockFrostTypes.isHealth(health)) {
          setIsHealth(health.is_healthy);
        } else {
          setIsHealth(false);
        }
      }
    } catch (err: any) {
      setIsHealth(false);
      return;
    }
  };

  useInterval(checkHealth, 30000);

  React.useEffect(() => {
    checkHealth();
  }, [props.env.wallet]);

  React.useEffect(() => {
    if (props.session !== undefined) {
      setChannelState(props.session.getChannelState());
      props.session.onChannelState(setChannelState);
    }
  }, [props.session]);

  let chatbar = <></>;

  if (channelState === "Connected" && props.session !== undefined) {
    if (layout === "horizontal") {
      chatbar = (
        <Box pos="fixed" bottom="4" right="8" zIndex={1}>
          <ComponentErrorBoundary>
            <ChatBar
              size={"md"}
              session={props.session as NetworkSession.Session}
            ></ChatBar>
          </ComponentErrorBoundary>
        </Box>
      );
    } else {
      chatbar = (
        <Center pos="fixed" zIndex={1} width={"100%"} bottom="4">
          <ComponentErrorBoundary>
            <ChatBar
              size={"sm"}
              session={props.session as NetworkSession.Session}
            ></ChatBar>
          </ComponentErrorBoundary>
        </Center>
      );
    }
  }

  return (
    <Flex direction="column" minH="100vh">
      <VStack w="full">
        {isHealthy ? <></> : <BackendIsDown />}
        <Box w="full">
          <Header
            env={props.env}
            session={props.session}
            channelState={channelState}
            lib={props.lib}
          />
        </Box>
      </VStack>
      <Outlet />
      <Spacer />
    </Flex>
  );
  
  }
function BackendIsDown() {
  return (
    <Alert status="error" variant="solid">
      <AlertIcon />
      The server is down! Viper Trade will not function properly.
    </Alert>
  );
}

function Header(props: {
  env: Env;
  session?: NetworkSession.Session;
  channelState: ChannelState;
  lib?: typeof CardanoSerializationLib;
}) {
  const layout: "vertical" | "horizontal" | undefined = useBreakpointValue({
    base: "vertical",
    sm: "horizontal",
  });

  if (layout === "horizontal") {
    return (
      <Flex position="fixed" top={0} width={'100%'} px={15} py={2} align={"center"} flexDirection={'row'} backgroundColor={'#212529'} justifyContent={'space-between'} height={65}>
        <HStack>
          <Logo></Logo>  
          <Link as={ReachLink} to="/home" style={{ textDecoration: 'none' }}>     
            <Text fontFamily={'syne'} fontWeight={'bold'} fontSize={{ base: "1rem", md: "1.4rem", lg: "1.6rem", xl: "2.21rem" }} //fontSize={{ base: "0.75rem", md: "1.05rem", lg: "1.2rem", xl: "1.7rem" }} <---- better sizing if color is white
              style={{    color: 'transparent', 
              backgroundImage: `url(${backgroundImg})`, 
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              backgroundSize: '110px', 
              backgroundPosition: 'top',
            }}
            >
              VIPERTRADE {/* position={'relative'} top={-15}*/}
            </Text>
          </Link> 
        </HStack>
        <HStack>
          <SessionStatus status={props.channelState} />
          <a href="https://viperswap.app/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Text color={'white'} fontFamily={'syne'} fontWeight={'bold'}>Back to ViperSwap</Text>
          </a>
          {/*<Image src={arrow} boxSize={50}></Image>*/}
        </HStack>
      </Flex>
    );
  } else {
    return (
      <Center p={2}>
        <VStack>
          <NavBar env={props.env} status={props.channelState} lib={props.lib} />
          <SessionStatus status={props.channelState} />
        </VStack>
      </Center>
    );
  }
}

function Logo() {
  return (
    <Center>
      <Link as={ReachLink} to="/home">
        <ViperLogo boxSize="48px" />
      </Link>
    </Center>
  );
}

function NavBar(props: {
  env: Env;
  status: ChannelState;
  lib?: typeof CardanoSerializationLib;
}) {
  const dynamic: "Large" | "Small" | undefined = useBreakpointValue({
    base: "Small",
    sm: "Large",
  });

  let spacing = 4;
  let px = 4;
  let py = 2;
  const pxE = dynamic === "Small" ? 0 : undefined;

  if (dynamic === "Large") {
    spacing = 4;
    px = 8;
    py = 3;
  }

  const bgColor = useColorModeValue("accent.500", "accentDarkMode.700");

  return (
    <HStack bgColor={bgColor} spacing={spacing} px={px} py={py} rounded={32}>
      <Info px={pxE} />
      <Trade px={pxE} channelState={props.status} />
      <Wallet
        lib={props.lib}
        px={pxE}
        wallet={props.env.wallet}
        onWalletChange={props.env.changeWallet}
      />
    </HStack>
  );
}
function SessionStatus(props: { status: ChannelState }) {
  const [hovering, setHovering] = React.useState<boolean>(false);
  const { isOpen, onToggle } = useDisclosure();
  const sizes = [5];
  const fontSizes = [12];

  let bgColor = "#A53135";
  let hoverColor = "#822329";

  /*if (props.status === "Destroyed") {
    bgColor = "failure";
    hoverColor = "failure.600";
  } else if (props.status === "Connected") {
    bgColor = "success";
    hoverColor = "success.600";
  }*/

  return (
    <ToolTip label={"The state of your trade connection"} isOpen={hovering}>
      <Box>
        <Center
          width={"max-content"}
          minWidth={sizes}
          height={sizes}
          rounded={20}
          bgColor={bgColor}
          cursor={"pointer"}
          _hover={{ bgColor: hoverColor }}
          _active={{
            bg: bgColor ,
            transform: "scale(0.98)",
          }}
          onClick={() => onToggle()}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {hovering || !isOpen ? (
            <Text color="white" mx={2} cursor={"pointer"} fontSize={fontSizes}>
              {props.status}
            </Text>
          ) : (
            <></>
          )}
        </Center>
      </Box>
    </ToolTip>
  );
}

function Info(props: { px?: number }) {
  return (
    <Box>
      <Menu>
        <MenuButton
          px={props.px}
          aria-label="Info"
          variant="ghost"
          as={Button}
          leftIcon={<Icons.INFO />}
          rightIcon={<Icons.CaretDown />}
        >
          INFO
        </MenuButton>
        <MenuList>
          <Link as={ReachLink} to="/faq">
            <MenuItem icon={<Icons.FAQ />}>FAQ</MenuItem>
          </Link>
          <Link href="https://www.youtube.com/watch?v=XdE0aK5ypWM" isExternal>
            <MenuItem icon={<Icons.Youtube />}>How to video</MenuItem>
          </Link>
          <Link as={ReachLink} to="/whitepaper">
            <MenuItem icon={<Icons.WhitePaper />}>White Paper</MenuItem>
          </Link>
          <Link as={ReachLink} to="/changelog">
            <MenuItem icon={<Icons.ChangeLog />}>Changelog</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  );
}

function Trade(props: { px?: number; channelState: ChannelState }) {
  let text = "TRADE";
  if (props.channelState === "Connected") {
    text = "REJOIN";
  }

  return (
    <Center>
      <Button
        px={props.px}
        as={ReachLink}
        to="/session"
        variant="ghost"
        leftIcon={<Icons.Trade />}
      >
        {text}
      </Button>
    </Center>
  );
}

function mkWalletIcon(src?: string) {
  return src === undefined ? (
    <Icon fontSize={24} as={Icons.Wallet} />
  ) : (
    <Image width={"32px"} src={src}></Image>
  );
}

function Wallet(props: {
  wallet?: BasicWallet;
  onWalletChange: (wallet: BasicWallet) => void;
  px?: number;
  lib?: typeof CardanoSerializationLib;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [canInstallPWA, installPWA] = usePWAInstall();
  return (
    <Box>
      <Menu>
        <MenuButton
          px={props.px}
          aria-label="User Settings"
          variant="ghost"
          as={IconButton}
          icon={mkWalletIcon(props.wallet?.icon())}
        >
          INFO
        </MenuButton>
        <MenuList>
          <Link as={ReachLink} to="/settings">
            <MenuItem icon={<Icons.Settings />}>Settings</MenuItem>
          </Link>
          {props.lib !== undefined ? (
            <MenuItem icon={<Icons.Wallet />} onClick={onOpen}>
              Connect Wallet
            </MenuItem>
          ) : (
            <></>
          )}
          {canInstallPWA ? (
            <MenuItem icon={<Icons.Install />} onClick={installPWA}>
              Install
            </MenuItem>
          ) : (
            <></>
          )}
        </MenuList>
      </Menu>
      {props.lib !== undefined ? (
        <WalletSelector
          lib={props.lib}
          onWalletChange={props.onWalletChange}
          isOpen={isOpen}
          onClose={onClose}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}



// The version number of the app
function VersionNumber(): JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <Text fontSize="xs" color={colorMode === "dark" ? "white" : "gray.700"}>
      v{__APP_VERSION__}
    </Text>
  );
}

function TermsOfUse() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Button mt={3} onClick={onOpen} variant="link">
        Terms of Use
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms of Use</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              By using this product you accept that the creator of this product is not responsible for any loss of funds due
              to any reason. It is the responsibility of the user to verify the
              correctness of the transaction before signing it with their
              wallet.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
