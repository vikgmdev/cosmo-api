import mongoose from 'mongoose';
import { UserModel } from '../user/user.model';

export interface AttemptModel extends mongoose.Document {
  ip: string;
  port: string;
  successful: boolean;
  user: UserModel;
}

const attemptSchema = new mongoose.Schema({
  ip: {
    type: String,
  },
  port: {
    type: String,
  },
  successful: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const Attempt = mongoose.model<AttemptModel>('Attempt', attemptSchema);
