function padNum(num) {
  return num.toString().padStart(2, '0');
}

function dateToStringLocal(date) {
  return `${date.getFullYear()}-${padNum(date.getMonth() + 1)}-${padNum(date.getDate())}`;
}

function stringToDateLocal(dateString) {
  const components = dateString.split(/-/);
  return new Date(components[0], components[1] - 1, components[2]);
}

function datetimeToStringLocal(datetime) {
  return `${datetime.getFullYear()}-${padNum(datetime.getMonth() + 1)}-${padNum(datetime.getDate())}T${padNum(datetime.getHours())}:${padNum(datetime.getMinutes())}`;
}

function stringToDatetimeLocal(datetimeString) {
  const components = datetimeString.split(/[-T:]/);
  return new Date(components[0], components[1] - 1, components[2], components[3], components[4]);
}

function combineDateTimeString(dateString, timeString) {
  return `${dateString}T${timeString}`;
}

function extractDateString(datetimeString) {
  return datetimeString.substring(0, 10);
}

function extractTimeString(datetimeString) {
  return datetimeString.substring(11, 16);
}

export {
  dateToStringLocal, stringToDateLocal, datetimeToStringLocal, stringToDatetimeLocal,
  combineDateTimeString, extractDateString, extractTimeString,
};
