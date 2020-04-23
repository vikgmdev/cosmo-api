import { PaginationQuery, AppointmentFilter, ResponsePagination } from '../types';
import { Appointment, AppointmentModel } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFiltersQuery = (queryParam: AppointmentFilter): any => {
  let filters = {};
  const orQuery = [];

  if (queryParam) {
    const query = queryParam;

    if (query.title) {
      const filter = {
        title: {
          contains: query.title,
        },
      };
      orQuery.push(filter);
    }

    if (orQuery.length > 0) {
      filters = {
        or: orQuery,
      };
    }
  }

  return filters;
};

export const find = async (
  filter: AppointmentFilter,
  paginationQuery: PaginationQuery,
): Promise<ResponsePagination<AppointmentModel>> => {
  // Run the query
  const totalCount = await Appointment.estimatedDocumentCount();

  const items = await Appointment.find(getFiltersQuery(filter))
    .populate('user')
    .sort(paginationQuery.sort)
    .skip(paginationQuery.skip)
    .limit(paginationQuery.limit)
    .exec();

  return {
    items,
    totalCount,
  };
};

export const getById = async (id: string): Promise<AppointmentModel> => {
  const appointment = await Appointment.findById(id).populate('user');

  if (!appointment) {
    throw 'Could not find the Appointment with the given ID';
  }

  return appointment;
};

export const create = async (appointment: AppointmentModel): Promise<AppointmentModel> => {
  const newAppointment = await new Appointment(appointment).save();

  // TODO: Assign appointment to User token
  // TODO: Generate Zoom link

  return newAppointment;
};

export const update = async (id: string, appointment: AppointmentModel): Promise<AppointmentModel> => {
  const appointmentToUpdate = await Appointment.findById(id).exec();

  if (!appointmentToUpdate) throw 'Appointment does not exists';

  if (appointment.comments) appointmentToUpdate.comments = appointment.comments;
  if (appointment.confirmed) appointmentToUpdate.confirmed = appointment.confirmed;
  if (appointment.date) appointmentToUpdate.date = appointment.date;
  if (appointment.payed) appointmentToUpdate.payed = appointment.payed;

  appointmentToUpdate.save();

  return appointmentToUpdate;
};

export const deleteById = async (id: string): Promise<AppointmentModel> => {
  const appointment = await Appointment.findByIdAndDelete(id);

  if (!appointment) {
    throw 'Could not find the Appointment with the given ID';
  }

  return appointment;
};
