import { EntitySchema } from "typeorm";
import { User } from './user.entity';

export const UserSchema = new EntitySchema<User>({
  name: "User",
  target: User,
  columns: {
    user_id: {
      type: String,
      primary: true
    },
    user_password: {
      type: String
    },
    user_name: {
      type: String
    },
    user_nickname: {
      type: String
    },
    user_phone_number: {
      type: String
    }
  }
});