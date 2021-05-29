import mongoose from 'mongoose';
import { UserModel } from './user.model';

export interface AppointmentModel extends mongoose.Document {
  comments?: string;
  user?: UserModel;
  zoomLink?: string;
  inviteeName?: string;
  inviteeEmail?: string;
  inviteeUUID?: string;
  inviteeTimezone?: string;
  inviteeReschedule?: boolean;
  eventUUID?: string;
  eventCanceled?: boolean;
  eventCanceledAt?: string;
  eventCancelerName?: string;
  eventCancelReason?: string;
  eventCreatedAt?: string;
  eventEndTime?: string;
  eventEndTimePretty?: string;
  eventInviteeEndTime?: string;
  eventInviteeEndTimePretty?: string;
  eventInviteeStartTime?: string;
  eventInviteeStartTimePretty?: string;
  eventStartTime?: string;
  eventStartTimePretty?: string;
}

const appointmentSchema = new mongoose.Schema(
  {
    eventUUID: {
      type: 'string',
    },
    eventCanceled: {
      type: 'boolean',
    },
    eventCanceledAt: {
      type: 'string',
    },
    eventCancelerName: {
      type: 'string',
    },
    eventCancelReason: {
      type: 'string',
    },
    eventCreatedAt: {
      type: 'string',
    },
    eventEndTime: {
      type: 'string',
    },
    eventEndTimePretty: {
      type: 'string',
    },
    eventInviteeEndTime: {
      type: 'string',
    },
    eventInviteeEndTimePretty: {
      type: 'string',
    },
    eventInviteeStartTime: {
      type: 'string',
    },
    eventInviteeStartTimePretty: {
      type: 'string',
    },
    eventLocation: {
      type: 'string',
    },
    eventStartTime: {
      type: 'string',
    },
    eventStartTimePretty: {
      type: 'string',
    },

    comments: {
      type: 'string',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    inviteeName: {
      type: 'string',
    },
    inviteeEmail: {
      type: 'string',
    },
    inviteeUUID: {
      type: 'string',
    },
    inviteeTimezone: {
      type: 'string',
    },
    inviteeReschedule: {
      type: 'boolean',
    },
    zoomLink: {
      type: 'string',
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

export const Appointment = mongoose.model<AppointmentModel>('Appointment', appointmentSchema);
