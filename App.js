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
      console.log("🚗authUser.attributes.sub : ", authUser.attributes.sub);
      console.log(
        "🚗authUser.attributes.name??xxx : ",
        authUser.attributes.name
      );
      console.log("🚗authUser.attributes.email : ", authUser.attributes.email);
      console.log(
        "🚗authUser.attributes.preferred_username : ",
        authUser.attributes.preferred_username
      );
      console.log("🚗authUser.username : ", authUser.username);

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
        name: authUser?.attributes?.name,
        status: "상태 메세지입니다.알았나요?",
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

const signUpConfig = {
  header: "Welcome Man~",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
      //이게 닉네임 ㅡ 중복가능... 그냥 이름이니까...  중복이 되니까.. 의미 없는듯..
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
      // 이게 아이디 (sub으로 사용됨) 그리고 노출되지 않음..ㅡ 중복불가
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};

export default withAuthenticator(App, { signUpConfig });
// export default (App);
