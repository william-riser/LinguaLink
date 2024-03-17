import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ChatType = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("language");
  const navigate = useNavigate();

  return (
    <div
      className="bg-cover bg-no-repeat bg-center min-h-screen flex flex-col justify-start items-center" 
      style={{ 
        backgroundImage: "url(/chatType.png)",
        fontFamily: "Judson, serif"
      }}
    >
      <div className="mt-20 mb-16"> 
        <h1 className="text-8xl text-gray-600" style={{ fontFamily: "Judson, serif" }}>Learn {searchTerm}</h1>
      </div>
      <div className="flex gap-12 mt-2">
        <button
          className="bg-yellow-100 hover:bg-yellow-200 text-gray-600 font-bold py-8 px-16 rounded-xl text-3xl shadow-md hover:shadow-lg outline outline-green-700" 
          onClick={() => navigate(`/aiChat?language=${searchTerm}`)}
          style={{ width: "385px", height: "331px" }} // Adjust width and height
        >
          Chat with AI
        </button>
        <button
          className="bg-yellow-100 hover:bg-yellow-200 text-gray-600 font-bold py-8 px-16 rounded-xl text-3xl shadow-md hover:shadow-lg outline outline-green-700" 
          onClick={() => navigate(`/userToUser?language=${searchTerm}`)}
          style={{ width: "385px", height: "331px" }} // Adjust width and height
        >
          Chat with People
        </button>
      </div>
    </div>
  );
};

export default ChatType;