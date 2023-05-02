import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import ContactListItem from "../components/ContactListItem";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import { deleteUser, updateUser } from "../graphql/mutations";

const ContactsScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      const filtered = result.data?.listUsers?.items.filter(
        (one) => !one._deleted
      );
      // setUsers(filtered);

      // result.data?.listUsers?.items.forEach((element) => {
      //   if (element._deleted) {
      //     const willdeleteUser = {
      //       id: element.id,
      //     };
      //     const willdeleteUserResponse = API.graphql(
      //       graphqlOperation(deleteUser, { input: willdeleteUser })
      //     );
      //     console.log(willdeleteUser);
      //   }
      // });

      // result.data?.listUsers?.items.forEach((element) => {
      //   if (element._deleted) {
      //     const willrevival = {
      //       id: element.id,
      //       _delete: false,
      //     };
      //     const willrevivalResponse = API.graphql(
      //       graphqlOperation(updateUser, { input: willrevival })
      //     );
      //     console.log(willrevivalResponse);
      //   }
      // });

      setUsers(result.data?.listUsers?.items);
      console.log("contactScreen On");
      console.log(users);
    });
  }, []);

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <ContactListItem user={item} />}
      style={{ backgroundColor: "white" }}
    />
  );
};

export default ContactsScreen;
