import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import { onUpdateChatRoom } from "../../graphql/subscriptions";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {
  // console.log("chat info : ", chat);
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [chatRoom, setChatRoom] = useState(chat);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const tempUser = chatRoom.users?.items.find(
        (e) => e.user.id !== authUser.attributes?.sub
      );
      setUser(tempUser.user);
      // console.log("CC: ", tempUser.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    //
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom, {
        filter: { id: { eq: chatRoom.id } },
      })
    ).subscribe({
      next: ({ value }) => {
        // console.log("VV : ", value);
        setChatRoom((cr) => {
          // console.log("cr : ", cr);
          return {
            ...(cr || {}),
            ...value.data?.onUpdateChatRoom,
          };
        });
      },
      error: (err) => console.warn(err),
    });
    return () => subscription.unsubscribe();
  }, [chatRoom.id]);

  // console.log("A : ", chat.users?.items);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Chat", { id: chatRoom.id, name: user.name })
      }
      style={styles.container}
    >
      <Image style={styles.image} />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {user.name}
          </Text>
          {chatRoom.LastMessage && (
            <Text style={styles.subTitle}>
              {dayjs(chatRoom.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )}
        </View>

        <Text numberOfLines={2} style={styles.subTitle}>
          {chatRoom.LastMessage?.text}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  name: {
    flex: 1,
    fontWeight: "bold",
  },
  subTitle: {
    color: "gray",
  },
});

export default ChatListItem;
