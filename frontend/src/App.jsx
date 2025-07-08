import React from "react";
import ChatBox from "./components/ChatBox";
import UploadForm from "./components/UploadForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">SmartTax AI Assistant</h1>
      <UploadForm />
      <ChatBox />
    </div>
  );
}

export default App;
