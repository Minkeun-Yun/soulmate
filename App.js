import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigator from "./src/navigation";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsconfig from "./src/aws-exports";
import { useEffect } from "react";
import { getUser } from "./src/graphql/queries";
import { createUser, updateUser, deleteUser } from "./src/graphql/mutations";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

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
      console.log("authUser : ", authUser);

      //query the database using Auth user id(sub)
      const userData = await API.graphql(graphqlOperation(getUser, { id: 2 }));

      console.log("userData : ", userData);

      // const deleteTemp = {
      //   id: 3,
      //   _version: userData.data.getUser._version,
      // };

      // const deleteTempResponse = await API.graphql(
      //   graphqlOperation(deleteUser, {
      //     input: deleteTemp,
      //   })
      // );
      // console.log("delete : ", deleteTempResponse);

      const tempHeartToArray = [...userData.data.getUser.heartto, 123];
      const tempHeartFromArray = [...userData.data.getUser.heartfrom, 321];

      const updateTemp = {
        id: 2,
        _version: userData.data.getUser._version,
        age: 1,
        heartto: tempHeartToArray,
        heartfrom: tempHeartFromArray,
      };

      const updateTempResponse = await API.graphql(
        graphqlOperation(updateUser, {
          input: updateTemp,
        })
      );
      console.log("update : ", updateTempResponse);

      if (userData.data.getUser) {
        console.log("user already exists in DB");
        return;
      }

      //if there is no users in db, create one
      const newUser = {
        id: 2,
        name: authUser.attributes.email,
        status: "moooooo yo!",
      };
      const newUserResponse = await API.graphql(
        graphqlOperation(createUser, { input: newUser })
      );
    };
    syncUser();
  }, []);

  useEffect(() => {
    const syncRecommend = async () => {};
    syncRecommend();
  }, []);

  return (
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
