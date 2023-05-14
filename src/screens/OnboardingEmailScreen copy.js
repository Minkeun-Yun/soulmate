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
  const route = useRoute();
  const navigation = useNavigation();
  const { name } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  // console.log("param.name", name);

  useEffect(() => {
    console.log("email Screen");
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  function validateEmail(email) {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    console.log("email test : ", regex.test(email));

    return regex.test(email);
  }

  async function onSubmit(data) {
    setIsLoading(true);
    const user = await signUp(
      name,
      data.email,
      "asdfasfASDFAWGRAWEGAWGZDBFSDFHAWRG!123",
      data.email
    );

    setIsLoading(false);
    console.log("user : ", user);
    if (user !== undefined) {
      navigation.navigate("OnboardingVerifyCodeScreen", {
        username: data.email,
      });
    } else {
      console.log("user is nudefined!(self msg)");
    }

    //
    console.log(data);
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Flex
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
      </Flex>
    </KeyboardAvoidingView>
  );
}
