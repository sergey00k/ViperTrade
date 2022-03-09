import {
  Container,
  VStack,
  Heading,
  Text,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { AdditionChangelog, UpdateChangelog } from "../components/Icons";

export default function ChangeLog() {
  return (
    <Container maxW="container.md" my={8}>
      <VStack spacing={4} width={"fill"} align="left">
        <Heading textAlign="center" fontSize={["4xl", null, "5xl"]}>
          Changelog
        </Heading>
        <VStack spacing={3} width={"fill"} align="left">
          <Entry title="Safer Trading" version="1.6.0" date="2022-03-04">
            <Add>Add code splitting.</Add>
            <Add>Asset verification using blacklists/whitelists.</Add>
            <Update>Replace Create React App with Vite.</Update>
            <Update>Updated UI of assets in the trading view.</Update>
            <Update>
              Fixed issue where Atomic Swap was black on first visit after
              update.
            </Update>
            <Update>A number of smaller GUI changes</Update>
          </Entry>
          <Entry title="Going Dark" version="1.5.0" date="2022-02-23">
            <Add>Dark Mode</Add>
            <Add>Settings Page</Add>
            <Add>Installable as a Progressive Web App</Add>
            <Update>A number of smaller GUI changes</Update>
          </Entry>
          <Entry title="Text Chat" version="1.4.0" date="2022-02-17">
            <Add>Text chat</Add>
            <Add>Add Dates to the changelog</Add>
            <Update>
              Change the Atomic Swap logo colors (dark #000000) (light #FFFFFF)
            </Update>
            <Update>A number of smaller GUI changes</Update>
          </Entry>
          <Entry
            title="Voice Chat & Documentation"
            version="1.3.0"
            date="2022-02-11"
          >
            <Add>Voice chat</Add>
            <Add>How to video</Add>
            <Add>Roadmap</Add>
            <Add>White Paper</Add>
            <Add>Changelog</Add>
            <Update>
              Have the connection indicator default to the open state
            </Update>
            <Update>A few other style changes.</Update>
          </Entry>
          <Entry title="GUI Overhaul" version="1.2.0" date="2022-02-04">
            <Add>Add empty state to FAQ search</Add>
            <Add>Add empty state to asset search</Add>
            <Add>Add connection indicator</Add>
            <Add>Show the addresses of connected wallets</Add>
            <Add>Add hero landing page</Add>
            <Add>Make the website responsive across multiple screen sizes</Add>
            <Add>Add user testing mode</Add>
            <Update>Update the look of the top navigation bar</Update>
            <Update>Change the color scheme of the app</Update>
            <Update>Minor bug fixes</Update>
            <Update>A million other small GUI changes!</Update>
          </Entry>
          <Entry title="Ada is just an asset" version="1.1.0" date="2022-01-29">
            <Add>
              Add a percentage symbol to the slider when updating the asset
              amount.
            </Add>
            <Add>If the amount of an asset is changed to 0, remove it</Add>
            <Update>Treat Ada as just another asset in the GUI</Update>
            <Update>Have external links open a new page</Update>
            <Update>Minor bug fixes</Update>
          </Entry>
          <Entry title="Release" version="1.0.0" date="2022-01-27">
            <Add>p2p asset trading</Add>
          </Entry>
        </VStack>
      </VStack>
    </Container>
  );
}

function Entry(props: {
  title: string;
  version: string;
  date: string;
  children: (string | JSX.Element)[] | string | JSX.Element;
}) {
  return (
    <VStack spacing={1} width={"fill"} align="left">
      <VStack spacing={0} width={"fill"} align="left">
        <Heading textAlign="left" fontSize={["3xl", null, "4xl"]}>
          {props.title}
        </Heading>
        <Text fontStyle={"italic"}>version - {props.version}</Text>
        <Text fontStyle={"italic"}>date - {props.date}</Text>
      </VStack>
      <List spacing={1}>{props.children}</List>
    </VStack>
  );
}

function Add(props: {
  children: (string | JSX.Element)[] | string | JSX.Element;
}) {
  return (
    <ListItem>
      <ListIcon as={AdditionChangelog} color="success.500" />
      {props.children}
    </ListItem>
  );
}

function Update(props: {
  children: (string | JSX.Element)[] | string | JSX.Element;
}) {
  return (
    <ListItem>
      <ListIcon as={UpdateChangelog} color="secondary.500" />
      {props.children}
    </ListItem>
  );
}