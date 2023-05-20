import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/core";
import { useForm, Controller, watch } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useRoute } from "@react-navigation/native";

const ConfirmEmailScreen = () => {
  const route = useRoute();
  const { username } = route.params || {}; // username = email
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm();
  // const [code, setCode] = useState("");

  const navigation = useNavigation();

  const onConfirmPressed = async (data) => {
    if (loading) {
      return;
    }
    setLoading(true);
    console.warn(data);

    try {
      const response = await Auth.confirmSignUp(username, data.code); //username = email
      console.log("confirm nice  : ", response);
      navigation.navigate("Home");
    } catch (e) {
      console.log("newPasswordSecreen.js : ", e.message);
    }

    setLoading(false);
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  const onResendPress = async () => {
    console.warn("onResendPress");
    try {
      await Auth.resendSignUp(username);
      console.log("code resent successfully");
    } catch (err) {
      console.log("error resending code: ", err);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{ required: "Confirmation code is required" }}
        />

        <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

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

export default ConfirmEmailScreen;
