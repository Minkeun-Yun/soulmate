import { Text, FlatList, Pressable, StyleSheet } from "react-native";
import chats from "../../../assets/data/chats.json";
import ChatListItem from "../../components/ChatListItem";
import { useState, useEffect } from "react";

import { API, graphqlOperation, Auth } from "aws-amplify";

import { listChatRooms } from "./queries";

const ChatsScreen = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(listChatRooms, {
          id: authUser?.attributes.sub,
        })
      );
      const rooms = response.data?.getUser?.ChatRooms?.items;
      const sortedRooms = rooms.sort(
        (r1, r2) =>
          new Date(r2.chatRoom.updatedAt) - new Date(r1.chatRoom.updatedAt)
      );

      // console.log("NNN : ", response.data.getUser.ChatRooms.items);
      setChatRooms(sortedRooms);
    };
    fetchChatRooms();
  }, []);

  return (
    <>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chat={item.chatRoom} />}
        style={{ backgroundColor: "white" }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 150,
    backgroundColor: "lightblue",
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
  sendButton: {
    width: 160,
    height: 30,
    backgroundColor: "lightyellow",
  },
});

export default ChatsScreen;
