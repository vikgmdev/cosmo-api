import mongoose from 'mongoose';
import { UserModel } from '../user/user.model';

export interface JwtModel extends mongoose.Document {
  expires: number;
  owner: UserModel;
  revoked: boolean;
  token: string;
}

const jwtSchema = new mongoose.Schema({
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
});

export const Jwt = mongoose.model<JwtModel>('Jwt', jwtSchema);
