import "./index.css";
import Home from './pages/home.jsx';
import ChatType from './pages/chatType.jsx';
import VideoChat from "./components/videoChat";
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
            </Routes>
        </Router>
  );
};

export default App;
