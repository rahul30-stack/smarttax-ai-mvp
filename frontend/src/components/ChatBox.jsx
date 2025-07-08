import React, { useState } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("https://smarttax-api.onrender.com/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input })
      });

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: "bot", text: "Error: Could not connect to server." }]);
    }
  };

  return (
    <div className="border p-4 rounded bg-white shadow">
      <h2 className="font-bold mb-2">SmartTax Chatbot</h2>
      <div className="h-40 overflow-y-auto border p-2 mb-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === "user" ? "text-right" : "text-left"}>
            <p><strong>{msg.sender}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
      <input
        className="border p-1 w-full mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a tax question..."
      />
      <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default ChatBox;
