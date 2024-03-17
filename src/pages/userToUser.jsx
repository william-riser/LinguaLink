import VideoChat from "../components/videoChat";
import { Chat } from "./userChat";
import { useSearchParams } from "react-router-dom";


const UserToUser = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("language");


  return (
    <div className="flex flex-row">
      <div className="absolute inset-0 z-0 bg-cover bg-center flex items-center h-screen" style={{ backgroundImage: "url(/aiBG.png)" }}>
      <div className="flex-1">
        <VideoChat />
      </div>
      <div className="flex-1">
        <Chat room={searchTerm} />
      </div>
      </div>
    </div>
  );
};

export default UserToUser;