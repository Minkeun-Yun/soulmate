import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
// import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useRoute } from "@react-navigation/native";

const NewPasswordScreen = () => {
  const route = useRoute();
  const { username } = route.params || {};
  // const [code, setCode] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  const { control, handleSubmit, watch } = useForm();

  const navigation = useNavigation();

  const onSubmitPressed = async (data) => {
    console.log("submitted!");
    try {
      const response = await Auth.forgotPasswordSubmit(
        username,
        data.code,
        data.password
      );
      console.log("resend respose : ", response);
      navigation.navigate("SignIn");
    } catch (e) {
      console.log("newPasswordSecreen.js : ", e.message);
    }

    //go to loggin? or signin?
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>

        <CustomInput
          name="code"
          control={control}
          placeholder="Code"
          rules={{ required: "Code is required" }}
        />

        <CustomInput
          name="password"
          control={control}
          placeholder="Enter your new password"
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long",
            },
          }}
        />

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});

export default NewPasswordScreen;
