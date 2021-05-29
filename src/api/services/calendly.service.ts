import { CalendlyHook } from '../types/calendly.types';
import { User, Appointment, AppointmentModel } from '../models';

export const calendlyCreated = async (calendlyHook: CalendlyHook): Promise<AppointmentModel> => {
  const {
    payload: {
      invitee: { name: inviteeName, email: inviteeEmail, uuid: inviteeUUID, timezone: inviteeTimezone },
      event: {
        uuid: eventUUID,
        location: zoomLink,
        canceled: eventCanceled,
        canceled_at: eventCanceledAt,
        canceler_name: eventCancelerName,
        cancel_reason: eventCancelReason,
        created_at: eventCreatedAt,
        end_time: eventEndTime,
        end_time_pretty: eventEndTimePretty,
        invitee_end_time: eventInviteeEndTime,
        invitee_end_time_pretty: eventInviteeEndTimePretty,
        invitee_start_time: eventInviteeStartTime,
        invitee_start_time_pretty: eventInviteeStartTimePretty,
        start_time: eventStartTime,
        start_time_pretty: eventStartTimePretty,
      },
    },
  } = calendlyHook;

  const userRecord = await User.findOne({
    email: inviteeEmail.toLowerCase(),
  });

  const newAppointment = new Appointment({
    user: userRecord?.id,
    zoomLink,
    inviteeName,
    inviteeEmail,
    inviteeUUID,
    inviteeTimezone,
    eventUUID,
    eventCanceled,
    eventCanceledAt,
    eventCancelerName,
    eventCancelReason,
    eventCreatedAt,
    eventEndTime,
    eventEndTimePretty,
    eventInviteeEndTime,
    eventInviteeEndTimePretty,
    eventInviteeStartTime,
    eventInviteeStartTimePretty,
    eventStartTime,
    eventStartTimePretty,
  });
  newAppointment.save();
  return newAppointment;
};

export const calendlyCanceled = async (calendlyHook: CalendlyHook): Promise<AppointmentModel> => {
  const {
    payload: {
      invitee: { is_reschedule: inviteeReschedule },
      event: {
        uuid: eventUUID,
        canceled: eventCanceled,
        canceled_at: eventCanceledAt,
        canceler_name: eventCancelerName,
        cancel_reason: eventCancelReason,
      },
    },
  } = calendlyHook;

  const appointment = await Appointment.findOne({
    eventUUID,
  });

  if (!appointment) throw new Error('Event not found');

  appointment.inviteeReschedule = inviteeReschedule;
  appointment.eventUUID = eventUUID;
  appointment.eventCanceled = eventCanceled;
  appointment.eventCanceledAt = eventCanceledAt;
  appointment.eventCancelerName = eventCancelerName;
  appointment.eventCancelReason = eventCancelReason;
  appointment.save();
  return appointment;
};
