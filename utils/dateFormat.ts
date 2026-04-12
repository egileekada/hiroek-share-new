import moment from "moment" 

export function dateFormat(item: any) {

  const isoDateString = item;
  const date = moment(isoDateString);
  return moment(date).format("ddd, MMMM Do YYYY")
}

export function dateFormatDashboad(date: any) {
  return moment(date).format("ddd, MM/DD/YY")
}

export function dateFormatMonthDay(date: any) {
  return moment(date).format("MMMM Do")
}

export function dateFormatMonth(date: any) {
  return moment(date).format("MMM")
}

export function dateFormatDay(date: any) {
  return moment(date).format("Do")
}

export const timeFormat = (item: any) => { 
  return moment(item).format('hh:mm a'); 
}