import moment from 'moment';

const formatTime = (date) => {
  return moment(date).format(`hh:mm A`);
};

export {formatTime};
