import moment from 'moment';

const formatTime = (date) => {
  return moment(date).format(`hh:mm A`);
};
const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

export {formatTime, formatDate};
