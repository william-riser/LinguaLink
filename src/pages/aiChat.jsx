import { GoogleGenerativeAI } from "@google/generative-ai";
import.meta.env;
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from 'react';

async function generateGeminiText(prompt) {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing API_KEY in environment variables");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { text };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error generating text: ${error.message}`);
    } else {
      throw new Error("Unexpected error generating text");
    }
  }
}
const AIChat = () => {
  const [searchParams] = useSearchParams();
  const language = searchParams.get("language");
  const [responseText, setResponseText] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { type: "user", text: `You are my friend who speaks ${language}. I want to have a conversation with you in ${language}. Only speak in ${language}` }, // Initial message
  ]);

  const handleGenerateClick = () => {
    const prompt = document.getElementById("textInput").value;
    document.getElementById("textInput").value = "";

    const newChatHistory = [...chatHistory, { type: "user", text: prompt }];
    setChatHistory(newChatHistory);

    const conversationHistory = newChatHistory
      .map(
        (entry) => `${entry.type === "user" ? "User:" : "AI:"} ${entry.text}`,
      )
      .join("\n");

    generateGeminiText(conversationHistory)
      .then(({ text }) => {
        setChatHistory([...newChatHistory, { type: "ai", text }]);
      })
      .catch((error) => {
        setResponseText(`Error: ${error.message}`);
      });
  };

  useEffect(() => {
    // Save the original styles to restore them later
    const originalStyle = {
      backgroundImage: document.body.style.backgroundImage,
      backgroundSize: document.body.style.backgroundSize,
      backgroundRepeat: document.body.style.backgroundRepeat,
    };

    // Set your background image on the body element
    document.body.style.backgroundImage = "url('/BabelBrellachat.png')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';

    // When the component unmounts, restore the original styles
    return () => {
      document.body.style.backgroundImage = originalStyle.backgroundImage;
      document.body.style.backgroundSize = originalStyle.backgroundSize;
      document.body.style.backgroundRepeat = originalStyle.backgroundRepeat;
    };
  }, []);



  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="z-10 pt-10 text-3xl font-bold mb-2 text-white drop-shadow-xl">AI Chat</h1>
      <div className="absolute inset-0 z-0 bg-cover bg-center flex flex-col items-center pt-28 h-screen" style={{ backgroundImage: "url(/aiBG.png)" }}>
        <style>
          {`
            .message-wrapper:first-child { 
              display: none; 
            }
            .chat-log {
              width: 100%; // Set the width to 50% of its parent
              margin: 0 auto; // Center it horizontally
              padding: 20px; // Add some padding inside the box
              background: white; // Set the background color to white
              border-radius: 20px; // Rounded corners
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Optional: add some shadow to make it stand out
              overflow: hidden; // In case the content overflows, it will be hidden
              max-height: 80vh; // Optional: You can set a max height
            }
            .user-message {
   
            }
            .ai-message {
              background-color: #d3d3d3; // Set a background color for AI messages
              padding: 10px;
              margin: 10px;
              border-radius: 15px; // Rounded corners for messages
            }
          `}
        </style>
        <div className="bg-white w-2/6 flex flex-col rounded-xl opacity-80"> {/* Modified line */}
          <div className="rounded-xl chat-log  p-4 border shadow-md bg-white min-h-96 max-h-96 overflow-scroll flex flex-col">
            {chatHistory.map((entry, index) => (
              <div
                key={index}
                className={`my-2 ${entry.type === "user" ? " text-white rounded-md" : "bg-green-500 max-w-40 rounded-md text-center"} message-wrapper flex ${entry.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`${entry.type === "user" ? "bg-blue-500 " : "text-gray-200 text-left"} inline-block p-2 rounded-xl `}
                >
                  {entry.text}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-end mt-4">
            <input
              type="text"
              id="textInput"
              placeholder="Enter Message..."
              className="flex-1 mr-2 p-2 border rounded-md"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGenerateClick();
                }
              }}
            />
            <button
              id="generateButton"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleGenerateClick}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
