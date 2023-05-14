import React from "react";
import { Flex, Text, Center, Button } from "react-native";
export function MKButton({ children }) {
  return (
    // <Button
    //   bg="white"
    //   _text={{ color: "black", fontWeight: "bold" }}
    //   size={"lg"}
    //   _pressed={{ bg: "trueGray.400" }}
    //   _disabled={{ bg: "trueGray.400" }}
    //   borderRadius={"2xl"}
    //   {...IButtonProps}
    // ></Button>
    <Button>
      <Text>{children}</Text>
    </Button>
  );
}
