import { useState, useEffect } from "react";
import { Text } from "react-native";
import { FlatList } from "react-native";
// import chats from "../../../assets/data/chats.json";
import RecommendItem from "../../components/RecommendItem";
import { API, graphqlOperation, Auth } from "aws-amplify";
// import { listRecommends } from "../../graphql/queries";
import { listRecommends } from "./queries";

const StatusScreen = () => {
  const [recommends, setRecommends] = useState([]);
  const [authUserId, setAuthUserId] = useState([]);
  useEffect(() => {
    const fetchRecommends = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(
        graphqlOperation(listRecommends, { id: authUser.attributes.sub })
      );

      console.log("BB : ", response.data.getUser.Recommends.items);
      setRecommends(response.data.getUser.Recommends.items);
      setAuthUserId(authUser.attributes.sub);
      // response.data.getUser.Recommends.items[0].recommend.users.items
    };
    fetchRecommends();
  }, []);

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
  const aaa = { abc: "123" };
  return (
    <FlatList
      data={recommends}
      renderItem={({ item }) => (
        <RecommendItem recommend={item.recommend} authUserId={authUserId} />
      )}
      style={{ backgroundColor: "white" }}
    />
    // <Text>sdf</Text>
  );
};

export default StatusScreen;
