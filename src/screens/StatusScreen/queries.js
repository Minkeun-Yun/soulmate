export const listRecommends = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      Recommends {
        items {
          recommend {
            id
            users {
              items {
                user {
                  id
                  name
                  age
                  status
                }
              }
            }
            ReplyYes {
              items {
                userID
              }
            }
            updatedAt
          }
        }
      }
    }
  }
`;
