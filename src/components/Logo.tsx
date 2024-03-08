import { Image } from "@chakra-ui/react";
import ViperLogo from "../assets/img/atomic-swap-logo-dark-192.png";


/**
 * Is darkmode compatible
 *
 *
 * @param props the sixe of the logo
 * @returns The Atomic Swap logo
 */
export default function ViperTradeLogo(props: {
  boxSize: string;
}): JSX.Element {
  return (
    <Image
      boxSize={props.boxSize}
      objectFit="cover"
      src={ViperLogo}
      alt="Viper Logo"
    ></Image>
  );
}
