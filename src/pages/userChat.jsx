import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase-config.ts";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import "../styles/Chat.css";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt"),
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 opacity-80 w-4/5 rounded-xl">
      <div className="">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="header text-center mb-4">
          <h1 className="text-2xl font-semibold">Welcome to: {room.toUpperCase()}</h1>
        </div>
        <div className="messages overflow-y-auto h-[32rem]"> {/* Adjust height as needed */}
          {messages.map((message) => (
            <div key={message.id} className="message p-3 my-2 rounded-md shadow-sm">
              <span className="user font-medium text-green-600">{message.user}:</span>{' '}
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="new-message-form mt-4 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className="new-message-input w-4/5 py-3 px-4 border border-gray-300 rounded-md focus:outline-none shadow-sm"
            placeholder="Type your message here..."
          />
          <button type="submit" className="send-button bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md ml-2">
            Send
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};
