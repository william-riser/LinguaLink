import "./index.css";
import Home from './pages/home.jsx';
import ChatType from './pages/chatType.jsx';
import VideoChat from "./components/videoChat";
import AIChat from "./pages/aiChat.jsx";
import UserToUser from "./pages/userToUser.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {

  
  
  
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chatType" element={<ChatType />} />
                <Route path="/videoChat" element={<VideoChat></VideoChat>} />
                <Route path="/aiChat" element={<AIChat />} />
                <Route path="/userToUser" element={<UserToUser />} />
            </Routes>
        </Router>
  );
};

export default App;
