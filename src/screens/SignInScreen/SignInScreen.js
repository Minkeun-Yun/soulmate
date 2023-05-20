import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Pressable,
} from "react-native";
import Logo from "../../../assets/images/Logo_1.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
// import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const SignInScreen = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }
    console.log("data : ", data);

    setLoading(true);
    try {
      const { user } = await Auth.signIn(data.email, data.password);
      // validate user
      // navigation.navigate("Home");
      console.log(user);
    } catch (e) {
      console.log("Ooops!(SignIn)", e.message);
      if (e.message === "User is not confirmed.") {
        //resend code
        try {
          await Auth.resendSignUp(data.email);
          console.log("code resent successfully");
          navigation.navigate("ConfirmEmail", { username: data.email }); // username = email
        } catch (err) {
          console.log("error resending code: ", err);
        }
      }
    }

    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          rules={{ required: "Email is required" }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          secureTextEntry
          rules={{
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password should be minimum 3 characters long",
            },
          }}
        />

        <CustomButton
          text={loading ? "Loading" : "Sign In"}
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
          // fgColor={"yellow"}
        />

        {/* <Pressable
          onPress={() => {
            console.log("logout");
            Auth.signOut();
          }}
        >
          <Text>log out</Text>
        </Pressable> */}

        {/* <SocialSignInButtons /> */}

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
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
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
