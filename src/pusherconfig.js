import Pusher from "pusher-js";
// import { handleSound } from "./components/NotificationsBox/NotificationsBox";
const user_id = localStorage.getItem("user_id");
const token = localStorage.getItem("token");

let pusherInstance = null;

Pusher.logToConsole = false
const initializePusher = () => {
  if (!pusherInstance) {
    pusherInstance = new Pusher(process.env.REACT_APP_PUBLIC_KEY, {
      cluster: process.env.REACT_APP_CLUSTER,
      channelAuthorization: {
        endpoint: process.env.REACT_APP_AUTH_ENDPOINT,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  } else {
    return pusherInstance;
  }
};

export const getPusherInstance = () => {
  if (!pusherInstance)
  {
    initializePusher()
  }

  return pusherInstance;
}
