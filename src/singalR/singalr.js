import * as signalR from "@microsoft/signalr";
import webURL from "../../public/config/config";
let connection = new signalR.HubConnectionBuilder().withUrl(webURL.url).build();
async function start() {
  try {
    await connection.start();
    console.log("SignalR Connected.");
  } catch (err) {
    console.log(err);
    setTimeout(start, 5000);
  }
}
connection.onclose(async () => {
  await start();
});
start();
export default {
  install: function (Vue) {
    Vue.prototype.connection = connection;
  },
};
