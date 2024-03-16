import { GoogleGenerativeAI } from '@google/generative-ai';
import.meta.env
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';


async function generateGeminiText(prompt) {
 const apiKey = import.meta.env.VITE_API_KEY;
 if (!apiKey) {
   throw new Error('Missing API_KEY in environment variables');
 }


 const genAI = new GoogleGenerativeAI(apiKey);
 const model = genAI.getGenerativeModel({ model: 'gemini-pro' });


 try {
   const result = await model.generateContent(prompt);
   const response = await result.response;
   const text = response.text();


   return { text };
 } catch (error) {
   if (error instanceof Error) {
     throw new Error(`Error generating text: ${error.message}`);
   } else {
     throw new Error('Unexpected error generating text');
   }
 }
}
const AIChat = () => {
  const [searchParams] = useSearchParams();
  const language = searchParams.get('language');
  const [responseText, setResponseText] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'user', text: `You are my friend who speaks ${language}` } // Initial message
  ]);

  
    const handleGenerateClick = () => {
      const prompt = document.getElementById('textInput').value;
      document.getElementById('textInput').value = '';
  
      const newChatHistory = [...chatHistory, { type: 'user', text: prompt }]; 
      setChatHistory(newChatHistory); 
  
      const conversationHistory = newChatHistory.map((entry) => 
        `${entry.type === 'user' ? 'User:' : 'AI:'} ${entry.text}`
      ).join('\n'); 
  
      generateGeminiText(conversationHistory) 
        .then(({ text }) => {
          setChatHistory([...newChatHistory, { type: 'ai', text }]); 
        })
        .catch((error) => {
          setResponseText(`Error: ${error.message}`); 
        });
    };
  
    return (
      <div className="container mx-auto p-4">
          <style>
          {`
          .message-wrapper:first-child { 
            display: none; 
          }
          `}
        </style>
        <h1>AI Chat</h1>
        <div className="chat-log mt-4 p-4 border rounded-md shadow-md">
              {chatHistory.map((entry, index) => (
        <div key={index} className={`my-2 ${entry.type === 'user' ? 'text-right' : ''} message-wrapper`}> 
          <p className={`bg-${entry.type === 'user' ? 'blue-200' : 'gray-200'} inline-block p-2 rounded-md`}>
            {entry.text}
          </p>
        </div>
      ))}
        </div>
        <div className="flex items-end mt-4">
          <input type="text" id="textInput" className="flex-1 mr-2 p-2 border rounded-md" />
          <button id="generateButton" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleGenerateClick}>
            Generate
          </button>
        </div>
      </div>
    );
  };
  
  
  export default AIChat;