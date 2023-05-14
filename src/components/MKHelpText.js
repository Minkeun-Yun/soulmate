import React from "react";
// import { Text, ITextProps } from "native-base";
import { Flex, Text, Center } from "react-native";

export function MKHelpText({ children }) {
  return (
    <Text
      style={{
        borderWidth: 0,
        fontSize: 16,
        paddingLeft: 0,
        marginBottom: 10,
        color: "gray",
      }}
    >
      {children}
    </Text>
    // <Text
    //   borderWidth={0}
    //   fontSize={16}
    //   paddingLeft={"0"}
    //   marginBottom={"10"}
    //   // fontWeight="bold"
    //   color={"trueGray.600"}
    //   {...ITextProps}
    // ></Text>
  );
}
