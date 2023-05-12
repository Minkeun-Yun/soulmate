import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { createChatRoom, createUserChatRoom } from "../../graphql/mutations";
import { getRecommend } from "./queries";
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

  useEffect(() => {
    const forEffect = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      // console.log("re ID : ", recommendId);
      const recommendData = await API.graphql(
        graphqlOperation(getRecommend, { id: recommendId })
      );

      setRecommend(recommendData.data?.getRecommend);
      setAuthUserId(authUser.attributes?.sub);

      const tempRecommendedUserSet =
        recommendData.data?.getRecommend?.users?.items;
      // console.log("ReData : ", recommendData.data?.getRecommend?.users?.items);
      const tempRecommendedUser = tempRecommendedUserSet.find(
        (item) => item.user?.id !== authUser.attributes?.sub
      );
      setRecommendedUser({ ...tempRecommendedUser });

      // console.log(
      //   "replyList : ",
      //   recommendData.data?.getRecommend?.ReplyYes?.items
      // );

      // console.log("^^^ : ", tempRecommendedUser);

      // await console.log("@ReplyYesList : ", replyYesList);
      // await console.log("@recommendedUser.id : ", recommendedUser.id);
    };
    forEffect();
  }, []);

  useEffect(() => {
    const yes1 = recommend.ReplyYes?.items.some((e) => e.userID === authUserId);
    setMyYes(yes1);
    const yes2 = recommend.ReplyYes?.items.some(
      (e) => e.userID === recommendedUser.user?.id
    );
    setYourYes(yes2);
  }, [recommendedUser, authUserId]);

  // console.log("recommend :", recommend);
  // console.log("authUserId :", authUserId);

  // const navigation = useNavigation();

  // set one recommendedUserData from two users data

  // console.log("recommendId :", recommendId);
  // console.log("myYES : ", myYes);
  // console.log("yourYES : ", yourYes);

  // console.log("rrrrr : ", recommend.ReplyYes.items[0]);

  const isRecent = (past) => {
    const diffTime =
      new Date().getTime() / (1000 * 60 * 60 * 24) -
      new Date(past).getTime() / (1000 * 60 * 60 * 24);
    // console.log("Diff : ", diffTime);
    if (diffTime < 0.5) {
      return true;
    }
    return false;
  };

  const myRecent = isRecent(recommend.updatedAt);

  // console.log("CC : ", recommend.updatedAt);

  // myYes={item.recommend.ReplyYes.items.some((e)=>e.userID === authUserId)}
  // yourYes={item.recommend.ReplyYes.items.some((e)=>e.userID === authUserId)}

  // console.log("replylist : ", replyYesList);

  // console.log("loading a recommendItem");

  // console.log(
  //   "reply list : ",
  //   replyYesList.items?.some((e) => e.userID === authUserId)
  // );

  // console.log("temp : ", tempRecommendedUser);
  // setRecommendedUser({ ...tempRecommendedUser.user });
  // setThisRecommend({ ...tempRecommendedUser });
  // recommend.users.items.forEach((ele) => {
  //   // console.log("CC : ", ele.user.id);
  //   if (ele.user.id !== authUserId) {
  //     // recommendedUser = { ...ele.user };
  //     thisRecommend = { ...ele };
  //     recommendedUser = { ...ele.user };
  //   }
  // });

  // !!!!!!!!!!!!!!replyYesList.items === Array
  // const tempAlready = replyYesList.items.find((re)=>re.userID === authUserId)
  // if(tempAlready){
  //   setAlreadySend(true);
  // }else{
  //   setAlreadySend();
  // }
  // setAlreadySend(true);

  // replyYesList.items.forEach((re) => {
  //   // console.log("re : ", re);
  //   if (re.userID === authUserId) {
  //     // setAlreadySend(true);
  //     return false;
  //   }
  // });

  // if I pushed sendReplyYes before, make the sendReplyYes button disabled

  // if (ReplyYes are two), show HEART instead of sendReplyYes button

  // if (One replyYes of mine ), make button disabled

  // if (One replyYes of partners ), show TEXT ("You're receive the Heart!")

  //make the button to add ReplyYes
  const onYesPress = async () => {
    if (myYes) {
      console.warn("already sending ReplyYes to ", recommendedUser.user?.name);
      return;
    }
    setMyYes(true);

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

    //if they send Yes each other(partner has sent already Yes), make a new chatroom.
  };

  const onMakeChatRoom = async () => {
    console.warn("채팅창만들기 Pressed!");

    //
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );

    console.log("newChatRoomData : ", newChatRoomData);

    if (!newChatRoomData.data?.createChatRoom) {
      console.log("Error. creating the new chatRoom");
    }

    const newChatRoom = newChatRoomData.data?.createChatRoom;

    //
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomId: newChatRoom.id, userId: recommendedUser.user?.id },
      })
    );

    //

    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomId: newChatRoom.id, userId: authUserId },
      })
    );

    //
    navigation.navigate("Chat", {
      id: newChatRoom.id,
      name: recommendedUser.user?.name,
    });

    navigation.navigate("Chat", {
      id: newChatRoom.id,
      name: recommendedUser.user?.name,
    });
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
