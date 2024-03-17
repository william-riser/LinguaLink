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
        fontFamily: "Judson, serif" // Apply Judson font family inline
      }}
    >
      <div className="mt-10 mb-32"> 
        <h1 className="text-8xl font-bold text-gray-600" style={{ fontFamily: "Judson, serif" }}>Learn French</h1> {/* Apply Judson font family inline */}
      </div>
      <div className="flex gap-5 mt-10">
        <button
          className="bg-green-200 hover:bg-green-400 text-gray-600 font-bold py-4 px-8 rounded-lg text-2xl shadow-md hover:shadow-lg w-72 h-72 outline outline-green-700" // Tailwind classes added
          onClick={() => navigate(`/aiChat?language=${searchTerm}`)}
          style={{ fontFamily: "Judson, serif" }} // Apply Judson font family inline
        >
          AI Chat
        </button>
        <button
          className="bg-green-200 hover:bg-green-400 text-gray-600 font-bold py-4 px-8 rounded-lg text-2xl shadow-md hover:shadow-lg w-72 h-72 outline outline-green-700" // Tailwind classes added
          onClick={() => navigate(`/userToUser?language=${searchTerm}`)}
          style={{ fontFamily: "Judson, serif" }} // Apply Judson font family inline
        >
          Video Chat
        </button>
      </div>
    </div>
  );
};

export default ChatType;
