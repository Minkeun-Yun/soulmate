import { useState, useEffect } from "react";
import { Alert, Text, StyleSheet, Pressable, Button, View } from "react-native";
import { FlatList } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
// import chats from "../../../assets/data/chats.json";
import RecommendItem from "../../components/RecommendItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
// import { listRecommends } from "../../graphql/queries";
import { listUsers } from "../../graphql/queries";
import { listRecommends } from "./queries";
import { createRecommend, createUserRecommend } from "../../graphql/mutations";
import OnboardingNameScreen from "../OnboardingNameScreen";
import { onCreateRecommend } from "../../graphql/subscriptions";
import { getUser } from "../../graphql/queries";
import { createUser } from "../../graphql/mutations";

const StatusScreen = () => {
  // let [forREFRESH, setForREFRESH] = useState(0);
  const route = useRoute();
  const navigation = useNavigation();
  const [recommends, setRecommends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState(null);
  const [id1, setId1] = useState(null);

  console.log("StatusScreen ON");

  const syncUser = async () => {
    //get Auth user
    const authUser = await Auth.currentAuthenticatedUser({
      bypassCache: true,
    });
    // console.log("authUser : ", authUser);
    console.log("🚗authUser.attributes.sub : ", authUser.attributes.sub);
    console.log("🚗authUser.attributes.name??xxx : ", authUser.attributes.name);
    console.log("🚗authUser.attributes.email : ", authUser.attributes.email);
    console.log(
      "🚗authUser.attributes.preferred_username : ",
      authUser.attributes.preferred_username
    );
    console.log("🚗authUser.username : ", authUser.username);

    //query the database using Auth user id(sub)
    const userData = await API.graphql(
      graphqlOperation(getUser, { id: authUser.attributes.sub })
    );
    // console.log("userData: ", userData);

    if (userData.data.getUser) {
      console.log("user already exists in DB");
      return;
    }

    //if there is no users in db, create one
    const newUser = {
      id: authUser.attributes.sub,
      name: authUser.attributes.email,
      status: "상태 메세지입니다.알았나요?",
    };
    const newUserResponse = await API.graphql(
      graphqlOperation(createUser, { input: newUser })
    );
  };

  useEffect(() => {
    syncUser();
  }, []);

  const fetchRecommends = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    setId1(authUser?.attributes?.name);
    setNickname(authUser?.attributes?.preferred_username);

    const response = await API.graphql(
      graphqlOperation(listRecommends, {
        id: authUser?.attributes.sub,
      })
    );

    // send these two data to RecommendItem Component
    // console.log("????? : ", response.data.getUser.Recommends.items);

    const tempRecommends = response?.data?.getUser?.Recommends?.items || [];
    const sortedRecommends = await tempRecommends
      .sort(
        (a, b) =>
          new Date(b.recommend.createdAt) - new Date(a.recommend.createdAt)
      )
      .filter((ele) => !ele.recommend._deleted);

    setRecommends(sortedRecommends);
    // setRecommends(tempRecommends);
    console.log("all Recommend : ", sortedRecommends);
    // console.log("authUser : ", authUser);
    // console.log("name : ", authUser?.attributes?.name);
    console.log("email : ", authUser?.attributes?.email);
    // console.log(
    //   "preferred_username : ",
    //   authUser?.attributes?.preferred_username
    // );

    // after completion, move in "oneMoreRecommend fn"
    // const tempAllUserList = await API.graphql(graphqlOperation(listUsers));
    // const allUserList = tempAllUserList.data?.listUsers?.items || [];
  };

  useEffect(() => {
    fetchRecommends();
  }, []);

  // useEffect(() => {
  //   //
  //   const subscription = API.graphql(
  //     graphqlOperation(onCreateRecommend, {
  //       filter: { id: { eq: chatRoom.id } },
  //     })
  //   ).subscribe({
  //     next: ({ value }) => {
  //       // console.log("VV : ", value);
  //       setChatRoom((cr) => {
  //         // console.log("cr : ", cr);
  //         return {
  //           ...(cr || {}),
  //           ...value.data.onUpdateChatRoom,
  //         };
  //       });
  //     },
  //     error: (err) => console.warn(err),
  //   });
  //   return () => subscription.unsubscribe();
  // }, []);

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
    // navigation.navigate("Test", { id: 123 });

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

    //
    if (false) {
      console.log("코인이 부족하면 여기서 멈춤");
    }

    console.log("추천 하나 더 !! 고마워!");

    console.log("recommends : ", recommends);

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

    //after check recommended User, fix below userId
    // *******
    const newRecommendUserId = "3";

    await API.graphql(
      graphqlOperation(createUserRecommend, {
        input: {
          userId: newRecommendUserId,
          recommendId: newRecommend.id,
        },
      })
    );

    fetchRecommends();
    // setForREFRESH(forREFRESH++);
  };

  return (
    <>
      <FlatList
        data={recommends}
        renderItem={({ item }) => (
          <RecommendItem recommendId={item.recommend?.id} />
        )}
        style={{ backgroundColor: "white" }}
        onRefresh={fetchRecommends}
        refreshing={loading}
      />

      <Pressable
        onPress={onRecommendPress}
        style={styles.sendButton}
        disabled={false}
      >
        <Text>Soulmate 추천 받기</Text>
      </Pressable>

      {/* navigation TEST */}
      <Pressable
        onPress={() => navigation.navigate("OnboardingNameScreen")}
        style={styles.sendButton}
      >
        <Text>Onboading</Text>
      </Pressable>

      {/* TEST button */}
      <Pressable style={styles.sendButton}>
        <Text onPress={() => Auth.signOut()}>Sign out</Text>
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
