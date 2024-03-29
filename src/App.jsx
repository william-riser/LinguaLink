import "./index.css";
import Home from "./pages/home.jsx";
import ChatType from "./pages/chatType.jsx";
import VideoChat from "./components/videoChat";
import AIChat from "./pages/aiChat.jsx";
import UserToUser from "./pages/userToUser.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import { useState } from "react";

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
        className="flex items-center justify-center"
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/chat"
          element={
            !isInChat ? (
              <div className="room">
                <label> Type room name: </label>
                <input onChange={(e) => setRoom(e.target.value)} />
                <button
                  onClick={() => {
                    setIsInChat(true);
                  }}
                >
                  Enter Chat
                </button>
              </div>
            ) : (
              <Chat room={room} />
            )
          }
        />
        <Route path="/chatType" element={<ChatType />} />
        <Route path="/videoChat" element={<VideoChat></VideoChat>} />
        <Route path="/aiChat" element={<AIChat />} />
        <Route path="/userToUser" element={<UserToUser />} />
      </Routes>
    </Router>
  );
};

export default App;
