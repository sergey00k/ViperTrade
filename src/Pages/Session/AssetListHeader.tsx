import { HStack, VStack, Heading } from "@chakra-ui/react";
import { BigNum } from "@emurgo/cardano-serialization-lib-browser";
import CommissionInfo from "./CommissionInfo";
import TestnetTag from "../../components/TestnetTag";
import Address from "./Address";
import * as Cardano from "@emurgo/cardano-serialization-lib-browser";
import Hidden from "../../components/Hidden";
import { NetworkID } from "cardano-web-bridge-wrapper";

export default function AssetListHeader(props: {
  text: string;
  isTesting?: boolean;
  address: Cardano.Address | null;
  networkID: NetworkID | null;
  commission: BigNum;
}) {
  return (
    <VStack spacing={[1]}>
      <VStack>
        <HStack>
          <Heading
            textAlign={'center'}
            fontSize={{ base: "0.9rem", md: "1.20rem", lg: "1.40rem", xl: "1.85rem" }}
            fontWeight={"bold"}
            color={'white'}
            fontFamily={'syne'}
          >
            {props.text}
          </Heading>
          <Hidden isHidden={props.networkID !== "Testnet"}>
            <TestnetTag size={"sm"} variant="solid" />
          </Hidden>
        </HStack>
      </VStack>
      {props.networkID === "Mainnet" && !props.commission.is_zero() ? (
        <CommissionInfo commission={props.commission} />
      ) : (
        <></>
      )}
      {props.address !== null ? (
        <Address
          networkID={props.networkID}
          isTesting={props.isTesting ? props.isTesting : false}
          address={props.address}
        ></Address>
      ) : (
        <></>
      )}
    </VStack>
  );
}
