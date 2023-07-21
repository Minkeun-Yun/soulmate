/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createReplyYes = /* GraphQL */ `
  mutation CreateReplyYes(
    $input: CreateReplyYesInput!
    $condition: ModelReplyYesConditionInput
  ) {
    createReplyYes(input: $input, condition: $condition) {
      id
      userID
      recommendID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateReplyYes = /* GraphQL */ `
  mutation UpdateReplyYes(
    $input: UpdateReplyYesInput!
    $condition: ModelReplyYesConditionInput
  ) {
    updateReplyYes(input: $input, condition: $condition) {
      id
      userID
      recommendID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteReplyYes = /* GraphQL */ `
  mutation DeleteReplyYes(
    $input: DeleteReplyYesInput!
    $condition: ModelReplyYesConditionInput
  ) {
    deleteReplyYes(input: $input, condition: $condition) {
      id
      userID
      recommendID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createRecommend = /* GraphQL */ `
  mutation CreateRecommend(
    $input: CreateRecommendInput!
    $condition: ModelRecommendConditionInput
  ) {
    createRecommend(input: $input, condition: $condition) {
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
          _lastChangedAt
        }
        nextToken
        startedAt
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
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateRecommend = /* GraphQL */ `
  mutation UpdateRecommend(
    $input: UpdateRecommendInput!
    $condition: ModelRecommendConditionInput
  ) {
    updateRecommend(input: $input, condition: $condition) {
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
          _lastChangedAt
        }
        nextToken
        startedAt
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
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteRecommend = /* GraphQL */ `
  mutation DeleteRecommend(
    $input: DeleteRecommendInput!
    $condition: ModelRecommendConditionInput
  ) {
    deleteRecommend(input: $input, condition: $condition) {
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
          _lastChangedAt
        }
        nextToken
        startedAt
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
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      id
      Messages {
        items {
          id
          text
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      users {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      LastMessage {
        id
        text
        chatroomID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
    }
  }
`;
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      id
      Messages {
        items {
          id
          text
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      users {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      LastMessage {
        id
        text
        chatroomID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
    }
  }
`;
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      id
      Messages {
        items {
          id
          text
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      users {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      LastMessage {
        id
        text
        chatroomID
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      text
      chatroomID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      text
      chatroomID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      text
      chatroomID
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      status
      image
      age
      heartto
      heartfrom
      Messages {
        items {
          id
          text
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRooms {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Recommends {
        items {
          id
          recommendId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
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
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      profileImages
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      status
      image
      age
      heartto
      heartfrom
      Messages {
        items {
          id
          text
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRooms {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Recommends {
        items {
          id
          recommendId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
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
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      profileImages
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      status
      image
      age
      heartto
      heartfrom
      Messages {
        items {
          id
          text
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      ChatRooms {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Recommends {
        items {
          id
          recommendId
          userId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
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
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      profileImages
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUserRecommend = /* GraphQL */ `
  mutation CreateUserRecommend(
    $input: CreateUserRecommendInput!
    $condition: ModelUserRecommendConditionInput
  ) {
    createUserRecommend(input: $input, condition: $condition) {
      id
      recommendId
      userId
      recommend {
        id
        users {
          nextToken
          startedAt
        }
        ReplyYes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        name
        status
        image
        age
        heartto
        heartfrom
        Messages {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        Recommends {
          nextToken
          startedAt
        }
        ReplyYes {
          nextToken
          startedAt
        }
        profileImages
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUserRecommend = /* GraphQL */ `
  mutation UpdateUserRecommend(
    $input: UpdateUserRecommendInput!
    $condition: ModelUserRecommendConditionInput
  ) {
    updateUserRecommend(input: $input, condition: $condition) {
      id
      recommendId
      userId
      recommend {
        id
        users {
          nextToken
          startedAt
        }
        ReplyYes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        name
        status
        image
        age
        heartto
        heartfrom
        Messages {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        Recommends {
          nextToken
          startedAt
        }
        ReplyYes {
          nextToken
          startedAt
        }
        profileImages
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUserRecommend = /* GraphQL */ `
  mutation DeleteUserRecommend(
    $input: DeleteUserRecommendInput!
    $condition: ModelUserRecommendConditionInput
  ) {
    deleteUserRecommend(input: $input, condition: $condition) {
      id
      recommendId
      userId
      recommend {
        id
        users {
          nextToken
          startedAt
        }
        ReplyYes {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      user {
        id
        name
        status
        image
        age
        heartto
        heartfrom
        Messages {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        Recommends {
          nextToken
          startedAt
        }
        ReplyYes {
          nextToken
          startedAt
        }
        profileImages
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUserChatRoom = /* GraphQL */ `
  mutation CreateUserChatRoom(
    $input: CreateUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    createUserChatRoom(input: $input, condition: $condition) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        Messages {
          nextToken
          startedAt
        }
        users {
          nextToken
          startedAt
        }
        LastMessage {
          id
          text
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
      }
      user {
        id
        name
        status
        image
        age
        heartto
        heartfrom
        Messages {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        Recommends {
          nextToken
          startedAt
        }
        ReplyYes {
          nextToken
          startedAt
        }
        profileImages
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUserChatRoom = /* GraphQL */ `
  mutation UpdateUserChatRoom(
    $input: UpdateUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    updateUserChatRoom(input: $input, condition: $condition) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        Messages {
          nextToken
          startedAt
        }
        users {
          nextToken
          startedAt
        }
        LastMessage {
          id
          text
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
      }
      user {
        id
        name
        status
        image
        age
        heartto
        heartfrom
        Messages {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        Recommends {
          nextToken
          startedAt
        }
        ReplyYes {
          nextToken
          startedAt
        }
        profileImages
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUserChatRoom = /* GraphQL */ `
  mutation DeleteUserChatRoom(
    $input: DeleteUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    deleteUserChatRoom(input: $input, condition: $condition) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        Messages {
          nextToken
          startedAt
        }
        users {
          nextToken
          startedAt
        }
        LastMessage {
          id
          text
          chatroomID
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
      }
      user {
        id
        name
        status
        image
        age
        heartto
        heartfrom
        Messages {
          nextToken
          startedAt
        }
        ChatRooms {
          nextToken
          startedAt
        }
        Recommends {
          nextToken
          startedAt
        }
        ReplyYes {
          nextToken
          startedAt
        }
        profileImages
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
