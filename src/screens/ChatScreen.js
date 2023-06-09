import { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Message from "../components/Message";
import InputBox from "../components/InputBox";

import bg from "../../assets/images/BG.png";

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getChatRoom } from "../graphql/queries";
import { onCreateMessage, onUpdateChatRoom } from "../graphql/subscriptions";

const ChatScreen = () => {
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();
  const chatRoomId = route.params.id;

  useEffect(() => {
    API.graphql(graphqlOperation(getChatRoom, { id: chatRoomId })).then(
      (result) => {
        setChatRoom(result.data?.getChatRoom);

        const tempMessageSet = result.data?.getChatRoom?.Messages?.items || [];
        // console.log("bb : ", result.data?.getChatRoom?.Messages?.items[0]);
        const sortedMessage = tempMessageSet.sort(
          (r1, r2) => new Date(r2.createdAt) - new Date(r1.createdAt)
        );
        setMessages(sortedMessage);
        // console.log(
        //   "sortedmessages : ",
        //   sortedMessage.map((e) => e.createdAt)
        // );
      }
    );

    //
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, { filter: { id: { eq: chatRoomId } } })
    ).subscribe({
      next: ({ value }) => {
        // console.log("VV : ", value);
        setChatRoom((cr) => {
          // console.log("cr : ", cr);
          return {
            ...(cr || {}),
            ...value.data.onUpdateChatRoom,
          };
        });
      },
      error: (err) => console.warn(err),
    });
    return () => subscription.unsubscribe();
  }, [chatRoomId]);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage, {
        filter: { chatroomID: { eq: chatRoomId } },
      })
    ).subscribe({
      next: ({ value }) => {
        setMessages((m) => [value.data.onCreateMessage, ...m]);
        // console.log("messages : ", messages);
      },
      error: (err) => console.warn(err),
    });

    return () => subscription.unsubscribe();
  }, [chatRoomId]);

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  // console.log("chatRoom : ", chatRoom.Messages.items);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 90}
      style={styles.bg}
    >
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <Message message={item} />}
          style={styles.list}
          inverted
        />
        <InputBox chatRoom={chatRoom} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});

export default ChatScreen;
