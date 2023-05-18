import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import OnboardingNameScreen from "../screens/OnboardingNameScreen";
// import OnboardingEmailScreen from "../screens/OnboardingEmailScreen";
import OnboardingVerifyCodeScreen from "../screens/OnboardingVerifyCodeScreen";

import TestScreen from "../screens/TestScreen";
import ContactsScreen from "../screens/ContactsScreen";
import MainTabNavigator from "./MainTabNavigator";
import ChatScreen from "../screens/ChatScreen";

import SignInScreen from "../screens/SignInScreen/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen/NewPasswordScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import { Auth } from "aws-amplify";

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [user, setUser] = useState(undefined);
  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />

            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>

    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <Stack.Screen
    //       name="OnboardingNameScreen"
    //       component={OnboardingNameScreen}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="OnboardingVerifyCodeScreen"
    //       component={OnboardingVerifyCodeScreen}
    //       options={{ headerShown: false }}
    //     />

    //     <Stack.Screen
    //       name="Home"
    //       component={MainTabNavigator}
    //       options={{ headerShown: false }}
    //     />
    //     {/* <Stack.Screen
    //       name="OnboardingEmailScreen"
    //       component={OnboardingEmailScreen}
    //       options={{ headerShown: false }}
    //     /> */}

    //     {/* <Stack.Screen
    //       name="Test"
    //       component={TestScreen}
    //       options={{ presentation: "modal" }}
    //     /> */}

    //     <Stack.Screen
    //       name="Chat"
    //       component={ChatScreen}
    //       options={{ headerShown: true }}
    //     />

    //     <Stack.Screen name="Contacts" component={ContactsScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default Navigator;
