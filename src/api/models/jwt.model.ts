import mongoose from 'mongoose';
import { UserModel } from './user.model';

export interface JwtModel extends mongoose.Document {
  expires: number;
  owner: UserModel;
  revoked: boolean;
  token: string;
}

const jwtSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      maxlength: 512,
    },
    expires: {
      type: Number,
    },
    revoked: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

export const Jwt = mongoose.model<JwtModel>('Jwt', jwtSchema);
