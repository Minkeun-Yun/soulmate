import React from "react";
import { Flex, Text } from "react-native";
// import { Flex, Text, Center } from "native-base";

export function MKBrand({ children }) {
  return (
    <>
      <Text
        style={{
          // backgroundColor: "gray",
          textAlign: "center",
          color: "darkgrey",
          fontWeight: "100",
          fontSize: 30,
          marginBottom: 15,
        }}
      >
        {children}
      </Text>
    </>
    //   <Center
    //   marginBottom={5}
    //   _text={{
    //     color: "trueGray.500",
    //     fontWeight: "thin",
    //     fontSize: "3xl",
    //   }}
    // >
    //   MK
    // </Center>
  );
}
