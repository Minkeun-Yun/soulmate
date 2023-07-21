import { useState } from "react";
import { View, StyleSheet, TextInput, Image } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { createMessage, updateChatRoom } from "../../graphql/mutations";
import { getChatRoom } from "../../graphql/queries";
import * as ImagePicker from "expo-image-picker";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const InputBox = ({ chatRoom }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const onSend = async () => {
    // console.warn("Sending a new message: ", text);
    if (text === "") return;

    const authUser = await Auth.currentAuthenticatedUser();

    const newMessageInput = {
      chatroomID: chatRoom.id,
      text,
      userID: authUser.attributes.sub,
    };

    const newMessageData = await API.graphql(
      graphqlOperation(createMessage, { input: newMessageInput })
    );

    await uploadFile(image);
    setImage(null);

    setText("");

    //should load chatRoom version [SELF MADE]
    // const tempChatRoom = await API.graphql(
    //   graphqlOperation(getChatRoom, { id: chatRoom.id })
    // );
    // console.log("tempChatRoom : ", tempChatRoom.data.getChatRoom._version);

    await API.graphql(
      graphqlOperation(updateChatRoom, {
        input: {
          id: chatRoom.id,
          chatRoomLastMessageId: newMessageData.data?.createMessage?.id,
          _version: chatRoom._version,
        },
      })
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    console.log(result);

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

      <SafeAreaView edges={["bottom"]} style={styles.container}>
        {/* Icon */}
        <AntDesign
          onPress={pickImage}
          name="plus"
          size={20}
          color="royalblue"
        />

        {/* Text Input */}
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="type your message..."
        />

        {/* Icon */}
        <MaterialIcons
          onPress={onSend}
          style={styles.send}
          name="send"
          size={16}
          color="white"
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,

    borderRadius: 50,
    borderColor: "lightgray",
    borderWidth: StyleSheet.hairlineWidth,
  },
  send: {
    backgroundColor: "royalblue",
    padding: 7,
    borderRadius: 15,
    overflow: "hidden",
  },

  // attachmentsContainer: {
  //   alignItems: "flex-end",
  // },
  seletedImage: {
    height: 100,
    width: 200,
  },
  // removeSelectedImage: {
  //   position: "absolute",
  //   right: 10,
  //   backgroundColor: "white",
  //   borderRadius: 10,
  //   overflow: "hidden",
  // },
});

export default InputBox;
