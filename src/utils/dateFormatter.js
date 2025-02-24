import moment from "moment";

export function formatDay(date) {
  return moment(date).format("DD");
}

export function formatMonth(date) {
  return moment(date).format("MM");
}

export function formatFullDate(date) {
  return moment(date).format("dddd, MMM YYYY");
}

export function formatTime(date) {
  return moment(date).format("hh:mm A");
}
