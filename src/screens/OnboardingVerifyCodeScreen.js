import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Flex,
  StyleSheet,
  Pressable,
} from "react-native";

import { useEffect, useState } from "react";

import { MKHeading } from "../components/MKHeading";
import { MKButton } from "../components/MKButton";
import { MKBrand } from "../components/MKBrand";
import { MKHelpText } from "../components/MKHelpText";
// import { Flex, VStack } from "native-base";

import { useForm, Controller } from "react-hook-form";
import { useRoute } from "@react-navigation/native";

export default function OnboardingEmailScreen({ navigation }) {
  const route = useRoute();
  const infoSet = route.params;

  console.log("infoSet : ", infoSet, "received!");

  useEffect(() => {
    console.log("verify code Screen");
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      age: infoSet.age,
    },
  });

  const onSubmit = (data) => {
    console.log("submit : ", { ...infoSet, age: data.age });
    navigation.navigate("Home");
    // navigation.navigate("OnboardingVerifyCodeScreen", {
    //   username: data.name,
    // });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View
        paddingVertical={5}
        flex={1}
        justifyContent={"space-between"}
        style={{ color: "white", backgroundColor: "black" }}
      >
        <View>
          <MKBrand></MKBrand>
          <MKHeading>How old are you? ({infoSet.username || ""})</MKHeading>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your age"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="slategray"
                autoFocus
              />
            )}
            name="age"
          />
        </View>
        <View>
          <MKHelpText>Enter verifycode from email.</MKHelpText>
          <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.text}>Continue</Text>
          </Pressable>
        </View>

        {/* <View>
          
          <MKButton onPress={handleSubmit(onSubmit)}>Continue</MKButton>
        </View> */}
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 50,
    // elevation: 3,
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    // lineHeight: 21,
    // letterSpacing: 1,
    fontWeight: "bold",
    color: "black",
  },
  input: {
    borderBottomWidth: 0,
    // borderColor: "white",
    fontSize: 35,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "white",
  },
});
