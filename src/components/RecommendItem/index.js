import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { createReplyYes } from "../../graphql/mutations";
import { API, graphqlOperation, Auth } from "aws-amplify";

dayjs.extend(relativeTime);

const RecommendItem = ({
  recommendId,
  recommend,
  replyYesList,
  updatedAt,
  createdAt,
  del,
}) => {
  const [authUserId, setAuthUserId] = useState(null);
  useEffect(() => {
    const forEffect = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      setAuthUserId(authUser.attributes.sub);

      const yes1 = await replyYesList.some(
        (e) => e.userID === authUser.attributes.sub
      );
      setMyYes(yes1);

      const yes2 = await replyYesList.some(
        (e) => e.userID === recommendedUser.id
      );
      setYourYes(yes2);

      console.log("@ReplyYesList : ", replyYesList);
      console.log("@recommendedUser.id : ", recommendedUser.id);
    };
    forEffect();
  }, []);

  // console.log("recommend :", recommend);
  // console.log("authUserId :", authUserId);

  // const navigation = useNavigation();

  // set one recommendedUserData from two users data
  const tempRecommended = recommend.users?.items?.find(
    (item) => item.user.id != authUserId
  );
  const recommendedUser = { ...tempRecommended?.user };

  const [myYes, setMyYes] = useState(false);
  const [yourYes, setYourYes] = useState(false);

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

  // console.log("CC : ", recommend.updatedAt);
  const myRecent = isRecent(recommend.updatedAt);

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
      console.warn("already sending ReplyYes to ", recommendedUser.name);
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
      recommendedUser.name
    );

    // if (!myYes) setMyYes(true);

    //make button disabled
  };

  return (
    <Pressable style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            추천된 이성 {dayjs(updatedAt).fromNow(true)} ago
          </Text>
        </View>
        {/* {console.log("C", recommendId, ", myYes : ", myYes)} */}

        <Text numberOfLines={2} style={styles.subTitle}>
          ID : {recommendedUser.id}
        </Text>
        <Text numberOfLines={2} style={styles.subTitle}>
          이름 : {recommendedUser.name}
        </Text>
        {/* <Text numberOfLines={2} style={styles.subTitle}>
          나이 : {recommendedUser.age}
        </Text> */}
        {/* <Text numberOfLines={2} style={styles.subTitle}>
          삭제 : {del}
        </Text> */}
        <Text numberOfLines={2} style={styles.subTitle}>
          최근? : {myRecent ? "Yes" : "No"}
        </Text>

        <Text numberOfLines={2} style={styles.name}>
          {yourYes ? recommendedUser.name + "님이 관심을 보냈습니다." : " "}
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
      </View>
    </Pressable>
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

export default RecommendItem;
