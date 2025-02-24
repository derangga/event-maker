import moment from "moment";

export const formatDateTime = (date, format = "Do MMM, YYYY - hh:mm A") => {
    return moment(date).format(format)
}

export const formatDate = (date, format = "MMM DD, YYYY") => {
    return moment(date).format(format)
}