import { useState, useEffect } from "react";
import { StyleSheet, View, Button, Image, Text } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";

import { updateUser } from "../graphql/mutations";
import { getUser } from "../graphql/queries";
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import * as ImagePicker from "expo-image-picker";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { S3Image } from "aws-amplify-react-native";
// import { useFormState } from "react-hook-form";

const SettingsScreen = () => {
  const [image, setImage] = useState(null);
  const [userDB, setUserDB] = useState({});
  const [user, setUser] = useState(undefined);
  const [getUserData, setGetUserData] = useState({});

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);

      const getUserData = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes.sub })
      );
      setUserDB({ ...getUserData });
      console.log("AA : ", userDB);
    } catch (e) {
      setUser(null);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  const onSend = async () => {
    try {
      await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: user.attributes.sub,
            _version: userDB._version,
            profileImages: [await uploadFile(image)],
          },
        })
      );
    } catch (e) {
      console.log(e.message);
    }

    setImage(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadFile = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const key = `${uuidv4()}.png`;
      await Storage.put(key, blob, {
        contentType: "image/png",
      });
      return key;
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  };

  return (
    <>
      {image && (
        <View>
          <Image
            style={styles.seletedImage}
            source={{ uri: image }}
            resizeMode="contain"
          />
        </View>
      )}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AntDesign
          onPress={pickImage}
          name="plus"
          size={20}
          color="royalblue"
        />
        {/* Icon */}
        <MaterialIcons
          onPress={onSend}
          style={styles.send}
          name="send"
          size={16}
          color="white"
        />

        <Text
          style={{
            color: COLORS.primary,
            fontSize: SIZES.xxLarge,
          }}
        >
          Hi^^
        </Text>
        <Text
          style={{
            color: COLORS.tertiary,
            fontSize: SIZES.xxLarge,
          }}
        >
          123{userDB.profileImages}321
        </Text>
        <Button onPress={() => Auth.signOut()} title="Sign out" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  seletedImage: {
    height: 100,
    width: 200,
  },
  heading: {
    color: "white",
    fontWeight: 800,
    fontSize: 20,
    marginVertical: 30,
  },
});

export default SettingsScreen;
