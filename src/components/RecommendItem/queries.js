export const getRecommend = /* GraphQL */ `
  query GetRecommend($id: ID!) {
    getRecommend(id: $id) {
      id
      users {
        items {
          id
          recommendId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          user {
            id
            age
            name
          }
        }
      }
      ReplyYes {
        items {
          id
          userID
          recommendID
          createdAt
          updatedAt
          _version
          _deleted
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
    }
  }
`;

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      ChatRooms {
        items {
          chatRoom {
            users {
              items {
                user {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
