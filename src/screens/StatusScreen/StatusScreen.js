import { useState, useEffect } from "react";
import { Alert, Text, StyleSheet, Pressable } from "react-native";
import { FlatList } from "react-native";
// import chats from "../../../assets/data/chats.json";
import RecommendItem from "../../components/RecommendItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
// import { listRecommends } from "../../graphql/queries";
import { listUsers } from "../../graphql/queries";
import { listRecommends } from "./queries";
import { createRecommend, createUserRecommend } from "../../graphql/mutations";

const StatusScreen = () => {
  const [recommends, setRecommends] = useState([]);

  console.log("StatusScreen ON");

  useEffect(() => {
    const fetchRecommends = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(listRecommends, {
          id: authUser?.attributes.sub,
        })
      );

      // send these two data to RecommendItem Component
      // console.log("????? : ", response.data.getUser.Recommends.items);

      const tempRecommends = response?.data?.getUser?.Recommends?.items || [];
      const sortedRecommends = tempRecommends
        .sort(
          (a, b) =>
            new Date(b.recommend.createdAt) - new Date(a.recommend.createdAt)
        )
        .filter((ele) => !ele.recommend._deleted);

      setRecommends(sortedRecommends);

      // console.log("sortedRecommends1 : ", sortedRecommends);

      // after completion, move in "oneMoreRecommend fn"
      const tempAllUserList = await API.graphql(graphqlOperation(listUsers));
      const allUserList = tempAllUserList.data?.listUsers?.items || [];
      console.log("all : ", allUserList);

      // response.data.getUser.Recommends.items[0].recommend.users.items

      // console.log(
      //   "test : ",
      //   response.data.getUser.Recommends.items[0].recommend.ReplyYes.items[0]
      //     .userID
      // );

      // console.log(
      //   "same? : ",
      //   response.data?.getUser.Recommends.items[0].recommend?.ReplyYes.items.some(
      //     (e) => e.userID === authUserId
      //   )
      // );

      // response.data.getUser.Recommends.item.recommend.ReplyYes.items.forEach(
      //   (re) => {
      //     // console.log("re : ", re);
      //     if (re.userID === authUserId) {
      //       console.log("이미!");
      //       return false;
      //     }
      //   }
      // );
    };
    fetchRecommends();
  }, []);

  const isRecent = (past) => {
    const diffTime =
      new Date().getTime() / (1000 * 60 * 60 * 24) -
      new Date(past).getTime() / (1000 * 60 * 60 * 24);
    if (diffTime < 3) {
      return true;
    }
    return false;
  };

  const onRecommendPress = () => {
    Alert.alert("포인트사용 : 추천 더 받기", "100 포인트가 사용됩니다. ", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Ok",
        style: "destructive",
        onPress: () => oneMoreRecommend(),
      },
    ]);
  };

  const oneMoreRecommend = async () => {
    //check if there is no other recommend between me and recommended user.

    console.warn("추천 하나 더 !! 고마워!");

    console.log("recommends : ", recommends);

    //
    // recommends.some((re)=>re.recommend.users.items.some((rere)=>rere.id === 3))
    // console.log(
    //   "BBB: ",
    //   recommends.some((re) =>
    //     re.recommend.users.items.some((rere) => rere.id === 123)
    //   )
    // );

    const newRecommendData = await API.graphql(
      graphqlOperation(createRecommend, { input: {} })
    );
    console.log("create recommend : ", newRecommendData);

    if (!newRecommendData.data?.createRecommend) {
      console.log("Error. creating the new reacommend");
    }
    const newRecommend = newRecommendData.data?.createRecommend;
    console.log(newRecommend);

    const authUser = await Auth.currentAuthenticatedUser();

    await API.graphql(
      graphqlOperation(createUserRecommend, {
        input: {
          userId: authUser.attributes.sub,
          recommendId: newRecommend.id,
        },
      })
    );

    await API.graphql(
      graphqlOperation(createUserRecommend, {
        input: {
          userId: 2,
          recommendId: newRecommend.id,
        },
      })
    );
  };

  // createRecommend
  // createUserRecommend(input: {recommendId: "", userId: ""})

  // useEffect(() => {
  //   API.graphql(graphqlOperation(listRecommends)).then((result) => {
  //     // const filtered = result.data?.listUsers?.items.filter(
  //     //   (one) => !one._deleted
  //     // );
  //     console.log("-----Status Screen on-----");
  //     console.log("recommend : :", result.data.listRecommends.items);
  //     // setRecommends(result.data?.listRecommends?.items);

  //     // result.data?.listUsers?.items.forEach((element) => {
  //     //   if (element._deleted) {
  //     //     const willdeleteUser = {
  //     //       id: element.id,
  //     //     };
  //     //     const willdeleteUserResponse = API.graphql(
  //     //       graphqlOperation(deleteUser, { input: willdeleteUser })
  //     //     );
  //     //     console.log(willdeleteUser);
  //     //   }
  //     // });

  //     // result.data?.listUsers?.items.forEach((element) => {
  //     //   if (element._deleted) {
  //     //     const willrevival = {
  //     //       id: element.id,
  //     //       _delete: false,
  //     //     };
  //     //     const willrevivalResponse = API.graphql(
  //     //       graphqlOperation(updateUser, { input: willrevival })
  //     //     );
  //     //     console.log(willrevivalResponse);
  //     //   }
  //     // });

  //     // setRecommends(result.data?.listUsers?.items);
  //     // console.log("recommends : ", recommends);
  //   });
  // }, []);

  return (
    <>
      <FlatList
        data={recommends}
        renderItem={({ item }) => (
          <RecommendItem recommendId={item.recommend?.id} />
        )}
        style={{ backgroundColor: "white" }}
      />
      <Pressable
        onPress={onRecommendPress}
        style={styles.sendButton}
        disabled={false}
      >
        <Text>추천 받기</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  sendButton: {
    width: 160,
    height: 30,

    backgroundColor: "lightyellow",
  },
});

export default StatusScreen;
