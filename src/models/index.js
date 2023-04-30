// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ReplyYes, Recommend, ChatRoom, Message, User, UserChatRoom } = initSchema(schema);

export {
  ReplyYes,
  Recommend,
  ChatRoom,
  Message,
  User,
  UserChatRoom
};