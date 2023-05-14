import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Navigator from "./src/navigation";

import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import awsconfig from "./src/aws-exports";

import { withAuthenticator } from "aws-amplify-react-native";

import { useEffect } from "react";
import { getUser } from "./src/graphql/queries";
import { createUser, updateUser, deleteUser } from "./src/graphql/mutations";
// import { NativeBaseProvider, Box } from "native-base";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });
// Amplify.configure(awsconfig);

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

  useEffect(() => {
    const syncUser = async () => {
      //get Auth user
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      // console.log("authUser : ", authUser);

      //query the database using Auth user id(sub)
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes.sub })
      );
      // console.log("userData: ", userData);

      if (userData.data.getUser) {
        console.log("user already exists in DB");
        return;
      }

      //if there is no users in db, create one
      const newUser = {
        id: authUser.attributes.sub,
        name: Math.random() * 30,
        status: "im a new guy!!! ",
      };
      const newUserResponse = await API.graphql(
        graphqlOperation(createUser, { input: newUser })
      );
    };
    syncUser();
  }, []);

  return (
    // <NativeBaseProvider style={styles.container}>
    <View style={styles.container}>
      <Navigator />
      <StatusBar style="auto" />
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

export default withAuthenticator(App);
