import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Navigator from "./src/navigation";

import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./src/aws-exports";

// import { withAuthenticator } from "aws-amplify-react-native";

import { useEffect } from "react";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";
// import { NativeBaseProvider, Box } from "native-base";

// Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });
Amplify.configure(awsconfig);

function App() {
  let today = new Date();

  console.log(
    "*******************************",
    today.getFullYear(),
    "/",
    today.getMonth(),
    "/",
    today.getDate(),
    "||",
    today.getHours(),
    ":",
    today.getMinutes(),
    ":",
    today.getSeconds()
  );

  return (
    // <NativeBaseProvider style={styles.container}>
    <View style={styles.container}>
      <Navigator />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
  },
});

export default App;
