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

const Stack = createStackNavigator();
// const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="OnboardingNameScreen"
          component={OnboardingNameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnboardingVerifyCodeScreen"
          component={OnboardingVerifyCodeScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="OnboardingEmailScreen"
          component={OnboardingEmailScreen}
          options={{ headerShown: false }}
        /> */}

        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Test"
          component={TestScreen}
          options={{ presentation: "modal" }}
        />

        <Stack.Screen name="Chat" component={ChatScreen} />

        <Stack.Screen name="Contacts" component={ContactsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
