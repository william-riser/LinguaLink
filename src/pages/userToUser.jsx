import VideoChat from "../components/videoChat";
import { Chat } from "./userChat";
import { useSearchParams } from "react-router-dom";


const UserToUser = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("language");


  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <VideoChat />
      </div>
      <div className="flex-1">
        <Chat room={searchTerm} />
      </div>
    </div>
  );
};

export default UserToUser;