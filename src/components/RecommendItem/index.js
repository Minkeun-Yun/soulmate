import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { getRecommend } from "./queries";
import { getUser } from "./queries";
import { createReplyYes } from "../../graphql/mutations";
import { API, graphqlOperation, Auth } from "aws-amplify";

dayjs.extend(relativeTime);

const RecommendItem = ({ recommendId }) => {
  const route = useRoute();
  const navigation = useNavigation();

  const [authUserId, setAuthUserId] = useState(null);
  const [recommendedUser, setRecommendedUser] = useState({});
  const [recommend, setRecommend] = useState({});
  const [myYes, setMyYes] = useState(false);
  const [yourYes, setYourYes] = useState(false);

  // const recommendedUser = { ...tempRecommended?.user };

  const loadDB = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    // console.log("re ID : ", recommendId);

    try {
      const recommendData = await API.graphql(
        graphqlOperation(getRecommend, { id: recommendId })
      );

      setRecommend(recommendData.data?.getRecommend);
      setAuthUserId(authUser.attributes?.sub);

      const tempRecommendedUserSet =
        recommendData.data?.getRecommend?.users?.items;
      console.log(
        "ReData(users) : ",
        recommendData.data?.getRecommend?.users?.items
      );
      const tempRecommendedUser = tempRecommendedUserSet.find(
        (item) => item.user?.id !== authUser.attributes?.sub
      );
      setRecommendedUser({ ...tempRecommendedUser });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    loadDB();
  }, [recommendId]);

  const yesSetting = () => {
    const yes1 = recommend.ReplyYes?.items.some((e) => e.userID === authUserId);

    const yes2 = recommend.ReplyYes?.items.some(
      (e) => e.userID === recommendedUser.user?.id
    );
    setMyYes(yes1);
    setYourYes(yes2);
  };

  useEffect(() => {
    yesSetting();
  }, [recommend, recommendedUser, authUserId]);

  const isRecent = (past) => {
    const diffTime =
      new Date().getTime() / (1000 * 60 * 60 * 24) -
      new Date(past).getTime() / (1000 * 60 * 60 * 24);
    // console.log("Diff : ", diffTime);
    if (diffTime < 0.5) {
      //"최근!"
      return true;
    }
    return false;
  };

  const myRecent = isRecent(recommend.updatedAt);

  // if I pushed sendReplyYes before, make the sendReplyYes button disabled

  // if (ReplyYes are two), show HEART instead of sendReplyYes button

  // if (One replyYes of mine ), make button disabled

  // if (One replyYes of partners ), show TEXT ("You're receive the Heart!")

  //make the button to add ReplyYes
  const onYesPress = async () => {
    let isMyYes = false;
    let isYourYes = false;

    //check if there is a myYes already.
    try {
      const recommendData = await API.graphql(
        graphqlOperation(getRecommend, { id: recommendId })
      );
      // console.log(recommendData.data.getRecommend.ReplyYes.items);
      isMyYes = recommendData.data.getRecommend.ReplyYes.items.some(
        (e) => e.userID === authUserId
      );
    } catch (e) {
      console.log(e.message);
    }

    //if have myYes already, stop here
    if (isMyYes) {
      console.log("Already senading ReplyYes to ", recommendedUser.user?.name);
      return;
    }

    //if there is no myYes
    //make new myYes
    try {
      const inputReplyYes = {
        recommendID: recommendId,
        userID: authUserId,
      };
      await API.graphql(
        graphqlOperation(createReplyYes, { input: inputReplyYes })
      );
      console.log(
        "generate replyYes From ",
        authUserId,
        ", sending replyYes to ",
        recommendedUser.user?.name
      );
      setMyYes(true);
      isMyYes = true;
    } catch (e) {
      console.warn("sendYes error : ", e.message);
    }

    //check if there is a yourYes again
    try {
      const recommendData = await API.graphql(
        graphqlOperation(getRecommend, { id: recommendId })
      );
      // console.log(recommendData.data.getRecommend.ReplyYes.items);
      isYourYes = recommendData.data.getRecommend.ReplyYes.items.some(
        (e) => e.userID === recommendedUser?.user?.id
      );
      console.log("isyouryes : ", isYourYes);
    } catch (e) {
      console.log(e.message);
    }

    console.log("myYes : ", myYes, " yourYes : ", yourYes);

    if (isMyYes && isYourYes) {
      onMakeChatRoom();
      return;
    }
  };

  const onMakeChatRoom = async () => {
    //check in realtime..
    //채팅룸 정보를 모두 읽어와서.. 이미 채팅룸이 있는지 확인후,, 없으면 만든다.
    let isPrevChatroom = false;
    try {
      const getUserData = await API.graphql(
        graphqlOperation(getUser, { id: authUserId })
      );
      const myChatRooms = getUserData?.data?.getUser?.ChatRooms?.items || [];

      myChatRooms.forEach((chatroom) => {
        // console.log("AA : ", chatroom.chatRoom.users.items);
        const check1 = chatroom.chatRoom?.users?.items.some(
          (e) => e.user?.id === recommendedUser?.user?.id
        );
        const check2 = chatroom.chatRoom.users.items.some(
          (e) => e.user?.id === authUserId
        );

        if (check1 && check2) {
          isPrevChatroom = true;
          console.warn("You have already chatroom with him.");
          return;
        }
      });
    } catch (e) {
      console.log(e.message);
    }
    console.log("채팅창만들기 Pressed!before");
    if (isPrevChatroom) return;

    console.log("채팅창만들기 Pressed!");

    // check 이미 있는지...이거 미리 체크해서 아예 버튼을 없애는 것도!.

    try {
      const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, { input: {} })
      );

      console.log("newChatRoomData : ", newChatRoomData);

      const newChatRoom = newChatRoomData.data?.createChatRoom;

      await API.graphql(
        graphqlOperation(createUserChatRoom, {
          input: {
            chatRoomId: newChatRoom.id,
            userId: recommendedUser.user?.id,
          },
        })
      );

      await API.graphql(
        graphqlOperation(createUserChatRoom, {
          input: { chatRoomId: newChatRoom.id, userId: authUserId },
        })
      );

      navigation.navigate("Chat", {
        id: newChatRoom.id,
        name: recommendedUser.user?.name,
      });
    } catch (e) {
      if (!newChatRoomData.data?.createChatRoom) {
        console.log("Error. creating the new chatRoom");
      }
      console.log(e.message);
    }

    // navigation.navigate("Chat", {
    //   id: newChatRoom.id,
    //   name: recommendedUser.user?.name,
    // });
  };

  return (
    <Pressable style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            추천된 이성 {dayjs(recommend.updatedAt).fromNow(true)} ago
          </Text>
        </View>
        {/* {console.log("C", recommendId, ", myYes : ", myYes)} */}

        <Text numberOfLines={2} style={styles.subTitle}>
          ID : {recommendedUser.user?.id}
        </Text>
        <Text numberOfLines={2} style={styles.subTitle}>
          이름 : {recommendedUser.user?.name}
        </Text>
        <Text numberOfLines={2} style={styles.subTitle}>
          나이 : {recommendedUser.user?.age}
        </Text>
        <Text numberOfLines={2} style={styles.subTitle}>
          최근? : {myRecent ? "Yes" : "No"}
        </Text>

        <Text numberOfLines={2} style={styles.name}>
          {yourYes
            ? recommendedUser.user?.name + "님이 관심을 보냈습니다."
            : " "}
          {/* {console.log("yourYes : ", yourYes)} */}
        </Text>

        <Text style={styles.name} numberOfLines={1}>
          re ID : {recommendId}
        </Text>
        {/* <Text style={styles.name} numberOfLines={1}>
          re ID : {recommendId}
        </Text> */}

        <Pressable onPress={onYesPress} disabled={false}>
          <Text numberOfLines={1} style={styles.sendButton}>
            관심 보내기 {myYes ? "Already!" : "not Yet"}
          </Text>
        </Pressable>
        <Pressable onPress={onMakeChatRoom} disabled={false}>
          <Text numberOfLines={2} style={styles.sendButton2}>
            채팅방 만들기 with {recommendedUser.user?.name}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 200,
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
    width: 200,
    height: 20,
    backgroundColor: "lightyellow",
  },
  sendButton2: {
    width: 300,
    height: 30,
    backgroundColor: "lightyellow",
  },
});

export default RecommendItem;
