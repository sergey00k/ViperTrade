import {
  Collapse,
  Flex,
  Text,
  Box,
  useDisclosure,
  Image,
  Spacer,
  VStack,
  HStack,
  CloseButton,
  Center,
  BoxProps,
  useColorModeValue,
  IconProps,
} from "@chakra-ui/react"; 
import { useState } from "react";
import { BigNum } from "@emurgo/cardano-serialization-lib-browser";
import UnitDisplay from "./UnitDisplay";
import EditableValue from "./EditableValue";
import * as CardanoAsset from "../Cardano/Asset";
import * as CardanoUtil from "../Cardano/Util";
import TextLink from "./TextLink";
import * as Icons from "./Icons";
import adaLight from "../assets/img/ada-light-128x128.png";
import adaDark from "../assets/img/ada-dark-128x128.png";
import * as ThemeTools from "@chakra-ui/theme-tools";
import { Theme } from "../Theme";
import { db } from "../Storage/DB";
import { useLiveQuery } from "dexie-react-hooks";
import Hidden from "./Hidden";
import { useEffect } from "react";

type AssetProps = {
  isLocked: boolean;
  maxValue?: BigNum;
  asset: CardanoAsset.Asset;
  onValueSubmit?: (value: BigNum) => void;
  onDelete?: () => void;
};

export default function Asset(props: AssetProps & BoxProps) {
  const { isOpen, onToggle } = useDisclosure();

  const { asset, maxValue, isLocked, onDelete, onValueSubmit, ...rest } = props;

  const listStatus: "Whitelist" | "Blacklist" | undefined = useLiveQuery(() => {
    if (props.asset.kind === "NativeAsset") {
      const policyID = CardanoAsset.policyID(props.asset);
      const assetID = CardanoUtil.assetFingerprint(
        props.asset.metadata.hash,
        props.asset.metadata.assetName
      ).fingerprint();
      return db.assetIdentifiers
        .where("identifier")
        .anyOf([policyID, assetID])
        .toArray()
        .then((allMatches) => {
          // There can at most be two matches
          // Rememebr testnet!
          const matches = allMatches.filter(
            (m) => m.networkID === props.asset.metadata.networkId
          );
          if (matches.length === 0) {
            return undefined;
          } else if (matches.length === 1) {
            return matches[0].list;
          } else {
            // If there is conflict assetID always win!
            if (matches[0].identifier === assetID) {
              return matches[0].list;
            } else {
              return matches[1].list;
            }
          }
        })
        .catch(() => undefined);
    }
    return undefined;
  }, [props.asset]);

  const colorMode = useColorModeValue(
    {
      color: "white",
      bgColor: "#2C2D2D",
      bgHoverColor: "accentDark.900",
      colorADA: "white",
      bgColorADA: "accentDark.700",
      bgHoverColorADA: "accentDark.900",
      adaImg: adaLight,
    },
    {
      color: "white",
      bgColor: "#2C2D2D",
      bgHoverColor: "accentDark.900",
      colorADA: "white",
      bgColorADA: "accent.300",
      bgHoverColorADA: "accent.100",
      adaImg: adaDark,
    }
  );

  let src: string | undefined = undefined;
  let textColor = colorMode.color;
  let bgColor = colorMode.bgColor;
  let hoverColor = colorMode.bgHoverColor;
  let symbol = "";

  if (props.asset.kind === "ADA") {
    src = colorMode.adaImg;
    textColor = colorMode.colorADA;
    bgColor = colorMode.bgColorADA;
    hoverColor = colorMode.bgHoverColorADA;
    symbol = props.asset.metadata.symbol;
    console.log('when ADA this prints')
  } else {
    src = props.asset.metadata.src;
  }
  const [assetContainerHeight, setAssetContainerHeight] = useState(40)

  useEffect(() => {
    const displayName = props.asset.metadata.displayName as string
    if (displayName?.length > 9) { 
      setAssetContainerHeight(60)
    }
    else if (displayName?.length > 30) {
      setAssetContainerHeight(80)
    }
  }, [props.asset.metadata.displayName])

  return (
    <Box
      /*minWidth={["100%", "sm", "md"]}*/
      background={bgColor}
      color={textColor}
      _hover={{ bg: hoverColor }}
      rounded={8}
      cursor="pointer"
      width={"100%"}
      {...rest}
      alignItems={"stretch"}
    >
      <Collapse startingHeight={`${assetContainerHeight}px`} in={isOpen} style={{ width: "100%" }}>
        <Flex paddingLeft={2} direction="row" alignItems={"stretch"} alignSelf="stretch">
          <LockStrip type={isLocked ? "Locked" : "Unlocked"} isOpen={isOpen} />
          <VStack
            align={"left"}
            py={1}
            px={3}
            width={"100%"}
            alignItems="stretch"
          >
            <Flex height="100%"> {/*44px*/}
              <HStack>
                <Center
                  maxWidth="40px"
                  rounded="full"
                  overflow="hidden"
                >
                  <Image draggable={false} height={6} src={src} />
                </Center>
                <Center>
                  <Text
                    color={
                      props.asset.metadata.displayName
                        ? undefined
                        : "orange.500"
                    }
                  >
                    {props.asset.metadata.displayName ?? "Missing Name"}
                  </Text>
                </Center>
              </HStack>
              <Spacer />
              <HStack>
                <Center>
                  {props.onValueSubmit ? (
                    <Box onClick={(e) => e.stopPropagation()} color={"white"}>
                      <EditableAmount
                        isADA={props.asset.kind === "ADA"}
                        maxValue={
                          props.maxValue ? props.maxValue : BigNum.zero()
                        }
                        value={props.asset.amount}
                        decimals={props.asset.metadata.decimals}
                        symbol={""}
                        _header={props.asset.metadata.displayName}
                        onValueSubmit={props.onValueSubmit}
                      />
                    </Box>
                  ) : (
                    <UnitDisplay
                      fontWeight={"bold"}
                      quantity={props.asset.amount}
                      decimals={props.asset.metadata.decimals}
                      symbol={symbol}
                      hide={false}
                    ></UnitDisplay>
                  )}
                </Center>
                {props.onDelete ? (
                  <Center onClick={(e) => e.stopPropagation()}>
                    <CloseButton
                      size={'sm'}
                      aria-label="Remove Asset"
                      onClick={props.onDelete}
                    />
                  </Center>
                ) : null}
              </HStack>
            </Flex>

          </VStack>
          <Hidden isHidden={listStatus === undefined} hasSpace={true}>
            <ListStrip type={listStatus} isOpen={isOpen} />
          </Hidden>
        </Flex>
      </Collapse>
    </Box>
  );
}

function LockStrip(props: {
  type: "Locked" | "Unlocked";
  isOpen: boolean;
}): JSX.Element {
  return props.type === "Locked" ? (
    <Strip
      icon={Icons.Lock}
      color="transparent"
      text="Locked"
      isOpen={props.isOpen}
    />
  ) : (
    <Strip
      icon={Icons.Unlock}
      color="none"
      text="unlocked"
      isOpen={props.isOpen}
    />
  );
}

function ListStrip(props: {
  type?: "Blacklist" | "Whitelist";
  isOpen: boolean;
}): JSX.Element {
  let strip = (
    <Strip
      icon={Icons.Question}
      color="accent.500"
      text=""
      isOpen={props.isOpen}
    />
  );

  if (props.type === "Whitelist") {
    strip = (
      <Strip
        icon={Icons.Whitelist}
        color="white"
        text="whitelist"
        isOpen={props.isOpen}
      />
    );
  } else if (props.type === "Blacklist") {
    strip = (
      <Strip
        icon={Icons.Blacklist}
        color="black"
        text="blacklist"
        isOpen={props.isOpen}
      />
    );
  }

  return strip;
}

function Strip(
  props: {
    icon: (props: IconProps) => JSX.Element;
    text: string;
    color: string;
    isOpen: boolean;
  } & BoxProps
): JSX.Element {
  const { color, icon, text, isOpen, ...rest } = props;
  let textColor = "white";

  if (ThemeTools.isLight(color)(Theme)) {
    textColor = "black";
  }

  return (
    <VStack
      color={color !== "none" && color !== undefined ? textColor : undefined}
      bg={color}
      px={1}
      py={2}
      {...rest}
      alignContent="center"
    >
      {icon({ boxSize: 4, mt: 2 })}

      <Hidden isHidden={!isOpen}>
        <Text
          pt="2"
          fontSize={4}
          fontWeight={"bold"}
          textAlign={"center"}
          textTransform={"uppercase"}
          sx={{ writingMode: "vertical-rl", textOrientation: "upright" }}
        >
          {text}
        </Text>
      </Hidden>
    </VStack>
  );
}

function ADAExtraInfo() {
  return (
    <Center>
      <Text>This is real ADA.</Text>
    </Center>
  );
}

function NativeAssetExtraInfo(props: {
  nativeAsset: CardanoAsset.NativeAsset;
}) {
  const policyID = CardanoAsset.policyID(props.nativeAsset);
  const assetID = CardanoUtil.assetFingerprint(
    props.nativeAsset.metadata.hash,
    props.nativeAsset.metadata.assetName
  ).fingerprint();

  const baseURL =
    props.nativeAsset.metadata.networkId === "Mainnet"
      ? "https://cardanoscan.io/"
      : "https://testnet.cardanoscan.io/";

  return (
    <VStack align={"left"}>
      <HStack>
        <Text fontSize={12} fontWeight={"bold"} width={"60px"}>
          policy
        </Text>
        <Box onClick={(e) => e.stopPropagation()} wordBreak="break-all">
          <TextLink
            fontSize={12}
            href={`${baseURL}tokenPolicy/${policyID}`}
            isExternal={true}
          >
            {policyID}
            {/* <ExternalIcon fontSize={18} /> */}
          </TextLink>
        </Box>
      </HStack>
      <HStack>
        <Text fontSize={12} fontWeight={"bold"} width={"60px"}>
          assetID
        </Text>
        <Box onClick={(e) => e.stopPropagation()} wordBreak="break-all">
          <TextLink
            fontSize={12}
            href={`${baseURL}token/${assetID}`}
            isExternal={true}
          >
            {assetID}
            {/*  <ExternalIcon fontSize={18} /> */}
          </TextLink>
        </Box>
      </HStack>
    </VStack>
  );
}

type EditableAmountProps = {
  maxValue: BigNum;
  value: BigNum;
  onValueSubmit: (v: BigNum) => void;
  symbol: string | JSX.Element;
  _header?: string | JSX.Element;
  decimals: number;
  isADA: boolean;
};

function EditableAmount(props: EditableAmountProps) {
  const colorMode = useColorModeValue(
    {
      color: "white",
      borderColor: "#A53135",
      borderActiveColor: "#822329",
      adaColor: "white",
      adaBorderColor: "#A53135",
    },
    {
      color: "white",
      borderColor: "#A53135",
      borderActiveColor: "#822329",
      adaColor: "black",
      adaBorderColor: "#A53135",
    }
  );

  const borderColor = props.isADA
    ? colorMode.adaBorderColor
    : colorMode.borderColor;
  const color = props.isADA ? colorMode.adaColor : colorMode.color;

  return (
    <EditableValue
      maxValue={props.maxValue}
      value={props.value}
      decimals={props.decimals}
      symbol={props.symbol}
      _header={props._header}
      onValueSubmit={props.onValueSubmit}
    >
      {(isOpen) => (
        <HStack
          borderBottomWidth={2}
          px={1}
          borderColor={isOpen ? colorMode.borderActiveColor : borderColor}
          _hover={{ borderColor: colorMode.borderActiveColor }}
        >
          <Icons.Edit color={color} fontSize={18} />
          <UnitDisplay
            color={color}
            fontSize={14}
            fontWeight={"bold"}
            quantity={props.value}
            decimals={props.decimals}
            symbol={props.symbol}
            hide={false}
          />
        </HStack>
      )}
    </EditableValue>
  );
}
