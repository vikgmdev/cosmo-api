import mongoose from 'mongoose';
import { UserModel } from './user.model';

export interface AppointmentModel extends mongoose.Document {
  comments: string;
  confirmed: boolean;
  date: number;
  payed: boolean;
  user: UserModel;
  zoomLink: string;
}

const appointmentSchema = new mongoose.Schema({
  comments: {
    type: 'string',
  },
  confirmed: {
    type: 'boolean',
  },
  date: {
    type: 'number',
    required: true,
  },
  payed: {
    type: 'boolean',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  zoomLink: {
    type: 'string',
  },
});

export const Appointment = mongoose.model<AppointmentModel>('Appointment', appointmentSchema);
