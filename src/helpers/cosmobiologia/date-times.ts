import moment, { Moment } from 'moment-timezone';

export interface DataForSweph {
  date: string;
  time: string;
  dateTime: Moment;
}

const getSwephDateTime = (dateTime: Moment): DataForSweph => {
  const date = dateTime.utc().format('D.M.YYYY');
  const time = dateTime.utc().format('HH:mm:ss');

  return {
    date,
    time,
    dateTime,
  };
};

export const getDateTime = (dayTime: string, dayTimeZone: string): DataForSweph => {
  const dateTime = moment.tz(dayTime, 'YYYY-MM-DD HH:mm', dayTimeZone);
  return getSwephDateTime(dateTime);
};

export const getProgressedDateTime = (dayTime: string, dayTimeZone: string, years?: number): DataForSweph => {
  const { dateTime: initialDateTime } = getDateTime(dayTime, dayTimeZone);
  const initialYear = initialDateTime.format('YYYY');

  const days = years || Number(moment().format('YYYY')) - Number(initialYear);

  const dateTimeProgresado = initialDateTime.add(days, 'days');
  return getSwephDateTime(dateTimeProgresado);
};
