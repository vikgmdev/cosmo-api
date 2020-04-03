import mongoose from 'mongoose';
import { omit } from 'ramda';

export interface UserModel extends mongoose.Document {
  email: string;
  password: string;
  fullName: string;
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
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        return omit(['password'], ret);
      },
    },
  },
);

export const User = mongoose.model<UserModel>('User', userSchema);
