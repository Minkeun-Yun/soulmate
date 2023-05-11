export const listChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatRooms {
        items {
          chatRoom {
            id
            _deleted
            users {
              items {
                user {
                  id
                  name
                  image
                  age
                  status
                }
              }
            }
            LastMessage {
              id
              createdAt
              text
            }
            updatedAt
            createdAt
          }
        }
      }
    }
  }
`;
