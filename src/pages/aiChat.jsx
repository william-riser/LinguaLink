import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AIChat = () => {
    const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setChatHistory([...chatHistory, { user: userInput }]);
    setUserInput(''); 

    try {
      const response = await axios.post('http://localhost:3000/generate-response', {
        prompt: userInput
      }, {
        headers: {
          'Authorization': 'Bearer YOUR_GEMINI_API_KEY'
        }
      });

      setChatHistory([...chatHistory, { chatbot: response.data.text }]);
    } catch (error) {
      // Handle API errors
    }
  };

  return (
    <div className="container mx-auto p-4"> 
      <h1 className="text-2xl font-bold mb-4">Gemini Chatbot</h1>
      <div className="chat-window p-4 rounded-lg shadow-md"> 
        {chatHistory.map((message, index) => (
          <p key={index} className={message.user ? 'text-right' : ''}>
            {message.user || message.chatbot}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full p-2 rounded-md border-2 border-gray-300"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
      </form>
    </div>
    );
}

export default AIChat;