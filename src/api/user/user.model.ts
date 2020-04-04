import mongoose from 'mongoose';
import { omit } from 'ramda';
import { RoleModel } from '../role/role.model';

export interface UserModel extends mongoose.Document {
  email: string;
  password: string;
  fullName: string;
  roles: RoleModel[];
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 200,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      maxlength: 120,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
  },
  {
    toJSON: {
      transform: (doc, ret): any => {
        return omit(['password'], ret);
      },
    },
  },
);

export const User = mongoose.model<UserModel>('User', userSchema);
