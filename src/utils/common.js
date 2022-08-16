function Timeconversion(time) {
  var d = time ? new Date(time) : new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var hours = d.getHours();
  var min = d.getMinutes();
  var seconds = d.getSeconds();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  if (hours < 0) hours = "0" + hours;
  if (min < 10) min = "0" + min;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    year + "-" + month + "-" + day + " " + hours + ":" + min + ":" + seconds
  );
}
function getTimestamp(time) {
  return new Date(time).getTime();
}
////获取url传参
function getUrlParams(url, params) {
  var res = new RegExp("(?:&|/?)" + params + "=([^&$]+)").exec(url);
  return res ? res[1] : "";
}
//获取当前日期
function getDateTime(type) {
  var date = new Date();
  var hengGang = "-";
  var maoHao = ":";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var curDate = date.getDate();
  var curHours = date.getHours();
  var curMinutes = date.getMinutes();
  var curSeconds = date.getSeconds();

  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (curDate >= 0 && curDate <= 9) {
    curDate = "0" + curDate;
  }
  if (curHours >= 0 && curHours <= 9) {
    curHours = "0" + curHours;
  }
  if (curMinutes >= 0 && curMinutes <= 9) {
    curMinutes = "0" + curMinutes;
  }
  if (curSeconds >= 0 && curSeconds <= 9) {
    curSeconds = "0" + curSeconds;
  }
  var currentdate = "";
  if (type == "year") {
    currentdate = year;
    return currentdate;
  } else if (type == "month") {
    currentdate = year + hengGang + month;
    return currentdate;
  } else if (type == "day") {
    currentdate = year + hengGang + month + "-" + curDate;
    return currentdate;
  } else {
    currentdate =
      year +
      hengGang +
      month +
      hengGang +
      curDate +
      " " +
      curHours +
      maoHao +
      curMinutes +
      maoHao +
      curSeconds;
    return currentdate;
  }
}
//value格式202012
function getMonthLastDateFn(value) {
  let year = value.slice(0, 4); //2020
  let mon = Number(value.slice(4)); //12
  let dateObj = new Date(year, mon, 0);
  let theMonthDay = dateObj.getDate(); //结果为31
  return theMonthDay;
}
function insertStr(date, length, Symbol, days) {
  let len = length > 4 ? 4 : 4;
  let year = date.slice(0, len);
  let moth = date.slice(len, date.length);
  let Time = year + Symbol + moth + Symbol + days;
  return Time;
}
function endTime(date) {
  let days = getMonthLastDateFn(date);
  let endTime = insertStr(date, 7, "-", days);
  return endTime;
}
function startTime(date) {
  let startTime = insertStr(date, 7, "-", "01");
  return startTime;
}
export default {
  Timeconversion,
  getTimestamp,
  getUrlParams,
  getDateTime,
  getMonthLastDateFn,
  insertStr,
  endTime,
  startTime,
};
