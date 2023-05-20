import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Flex,
} from "react-native";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";

import { MKHeading } from "../components/MKHeading";
import { MKInput } from "../components/MKInput";
import { MKButton } from "../components/MKButton";
import { MKBrand } from "../components/MKBrand";
import { MKHelpText } from "../components/MKHelpText";
// import { Flex, VStack } from "native-base";
// import { Auth, Amplify } from "aws-amplify";

// import awsconfig from "../../src/aws-exports";
// Amplify.configure(awsconfig);

// async function signUp(name, username, password, email) {
//   try {
//     const { user } = await Auth.signUp({
//       username,
//       password,
//       attributes: {
//         email, // optional
//         name, // optional - E.164 number convention
//         // other custom attributes
//       },
//       autoSignIn: {
//         // optional - enables auto sign in after user is confirmed
//         enabled: true,
//       },
//     });
//     console.log("AA : ", user);
//   } catch (error) {
//     console.log("error signing up:", error);
//   }
// }

export default function OnboardingEmailScreen() {
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View
        safeArea
        flex={1}
        justifyContent={"space-between"}
        background="black"
        paddingX={5}
      >
        <View>
          <MKBrand></MKBrand>
          <MKHeading>Create account using your email address</MKHeading>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCapitalize={"none"}
                style={styles.input}
                placeholder="Email address"
                onBlur={onBlur}
                onChangeText={(val) => {
                  onChange(val);
                  setIsValid(validateEmail(val));
                  // console.log("isValid", isValid);
                }}
                value={value.toLowerCase()}
                placeholderTextColor="slategray"
                autoFocus
              />
            )}
            name="email"
          />
          {/* <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <MKInput
                placeholder="Email address"
                onBlur={onBlur}
                onChangeText={(val) => {
                  onChange(val);
                  setIsValid(validateEmail(val));
                  // console.log("isValid", isValid);
                }}
                value={value.toLowerCase()}
                autoFocus
              />
              
            )}
            name="email"
          /> */}
        </View>
        <View>
          <MKHelpText>
            By clicking 'Continue', your agree to our Term of Service.
          </MKHelpText>
          <MKButton
            isLoading={isLoading}
            isLoadingText="Registering..."
            isDisabled={!isValid}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </MKButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
