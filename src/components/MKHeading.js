import React from "react";
import { Flex, Text, Center, Heading, StyleSheet } from "react-native";
// import { Heading, IHeadingProps } from "native-base";

export function MKHeading({ children }) {
  return (
    // <Heading
    //   color="white"
    //   fontSize={20}
    //   marginBottom={5}
    //   {...IHeadingProps}
    // ></Heading>
    <Text style={styles.heading}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontWeight: 800,
    fontSize: 20,
    marginVertical: 30,
  },
});
