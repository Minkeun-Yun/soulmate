import { useState, useEffect } from "react";
import { Text } from "react-native";
import { FlatList } from "react-native";
import chats from "../../assets/data/chats.json";
import RecommendItem from "../components/RecommendItem";
import { API, graphqlOperation } from "aws-amplify";
import { listRecommends } from "../graphql/queries";

const StatusScreen = () => {
  const [recommends, setRecommends] = useState([]);

  // useEffect(() => {
  //   API.graphql(graphqlOperation(listRecommends)).then((result) => {
  //     // const filtered = result.data?.listUsers?.items.filter(
  //     //   (one) => !one._deleted
  //     // );
  //     setRecommends(filtered);

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
  //     console.log("recommends : ", recommends);
  //   });
  // }, []);

  return (
    // <FlatList
    //   data={chats}
    //   renderItem={({ item }) => <RecommendItem chat={item} />}
    //   style={{ backgroundColor: "white" }}
    // />
    <Text numberOfLines={1}>aasdfsdfsdf</Text>
  );
};

export default StatusScreen;
