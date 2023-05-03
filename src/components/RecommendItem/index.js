import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const RecommendItem = ({ recommend, authUserId }) => {
  // const navigation = useNavigation();
  // console.log("aaa : ", recommend);
  // console.log("name : ", recommend.users.items[1].user);

  // set one recommendedUserData between two users data
  let recommendedUser = {};
  // const [recommendedUser, setRecommendedUser] = useState([]);

  recommend.users.items.forEach((ele) => {
    // console.log("CC : ", ele.user.id);
    if (ele.user.id !== authUserId) {
      recommendedUser = { ...ele };
    }
  });
  console.log("recommendedUserName : ", recommendedUser.user.name);

  return (
    <Pressable style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            updatedAt : {recommend.updatedAt}
          </Text>
        </View>
        <Text numberOfLines={2} style={styles.subTitle}>
          name : {recommend.users.items[0].user.name}
        </Text>
        <Text numberOfLines={2} style={styles.subTitle}>
          age : {recommend.users.items[0].user.age}
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

export default RecommendItem;
