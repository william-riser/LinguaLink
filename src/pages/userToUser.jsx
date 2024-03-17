import VideoChat from "../components/videoChat";
import { Chat } from "./userChat";

const UserToUser = () => {
  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <VideoChat />
      </div>
      <div className="flex-1">
        <Chat room="userToUser" />
      </div>
    </div>
  );
};

export default UserToUser;