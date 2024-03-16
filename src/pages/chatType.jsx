import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ChatType = () => {
    const [searchParams] = useSearchParams(); 
    const searchTerm = searchParams.get("language");
    const navigate = useNavigate();


    return (
        <div className="flex flex-col items-center gap-5 mt-10"> 
            <h1>{searchTerm}</h1>
            <div className="flex gap-5">  
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-md hover:shadow-lg"
                    onClick={() => navigate("/aiChat")}
                >
                    AI Chat
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-md hover:shadow-lg"
                >
                    Video Chat
                </button>
            </div>
        </div>
    );
}

export default ChatType;