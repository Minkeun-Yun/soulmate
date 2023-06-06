import { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Flex,
  Pressable,
  StyleSheet,
} from "react-native";

import { useRoute } from "@react-navigation/native";
import { MKHeading } from "../components/MKHeading";
import { MKBrand } from "../components/MKBrand";
import { useForm, Controller } from "react-hook-form";

export default function OnboardingNameScreen({ navigation }) {
  const route = useRoute();
  const infoSet = {};
  console.log("te : ", infoSet.username);
  console.log("te : ", infoSet.age);
  // const navigation = useNavigation();

  useEffect(() => {
    console.log(
      "name Screen",
      new Date().getHours(),
      ":",
      new Date().getMinutes(),
      ":",
      new Date().getSeconds()
    );
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: infoSet.username,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate("OnboardingVerifyCodeScreen", {
      ...infoSet,
      username: data.username,
    });
    // navigation.navigate("OnboardingVerifyCodeScreen");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      {/* <Flex
        safeArea
        flex={1}
        justifyContent={"space-between"}
        background="black"
        paddingX={5}
      >
        <View>
          <MKBrand></MKBrand>
          <MKHeading>Let's get started, what's your name?</MKHeading>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <MKInput placeholder="Your name" />
            )}
            name="name"
          />
        </View>
        <View>
          <MKButton onPress={handleSubmit(onSubmit)}>Continue</MKButton>
        </View>
      </Flex> */}
      <View
        paddingVertical={5}
        flex={1}
        justifyContent={"space-between"}
        style={{ color: "white", backgroundColor: "black" }}
      >
        <View>
          <MKBrand>MK</MKBrand>
          <MKHeading>Let's get started, what's your name?</MKHeading>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                autoCapitalize={"none"}
                style={styles.input}
                placeholder="Your name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="slategray"
              />
            )}
            name="username"
          />
        </View>

        {/* <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="First name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="firstName"
        />
        {errors.firstName && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Last name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="lastName"
        /> */}
        <View>
          <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.text}>Continue</Text>
          </Pressable>
        </View>
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
//   borderWidth={0}
//   fontSize={35}
//   paddingLeft={"0"}
//   fontWeight="bold"
//   placeholderTextColor={"trueGray.800"}
//   _focus={{
//     bg: "black",
//     selectionColor: "white",
//   }}
//   variant="underlined"
//   borderBottomColor={"trueGray.800"}
//   color="white"
