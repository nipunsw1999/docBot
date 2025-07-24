import { useEffect, useRef, useState } from "react";
import Chatboticon from "./components/Chatboticon";
import Chatform from "./components/Chatform";
import ChatMessage from "./components/ChatMessage";
import LogoIcon from "./components/LogoIcon";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const chatBodyRef = useRef();

  const generateBotResponse = async (history, product) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text },
      ]);
    };

    const chat_id = null;
    const product_id = product; // ✅ using selected product here
    const lastUserMessage = history[history.length - 1]?.text || "";

    const requestBody = {
      query: lastUserMessage,
      chat_id,
      product_id: product,
    };

    try {
      const response = await fetch("http://127.0.0.1:8002/query/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong!");
      }

      updateHistory(data.response.text);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);
  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        id="chatbot-toggler"
      >
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close </span>
      </button>
      {/* <button id="chatbot-toggler">Hello</button> */}
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <LogoIcon />
            <h2 className="logo-text">DOC Chatbot</h2>
          </div>
          <button
            onClick={() => setShowChatbot((prev) => !prev)}
            className="material-symbols-rounded"
          >
            keyboard_arrow_down
          </button>
        </div>
        {/* chatbot body  */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <Chatboticon />
            <p className="message-text">
              Welcome to H2O Rideau! Your AI Assistant for Intelligent Document
              Search
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        {/* chatbot footer  */}
        <div className="chat-footer">
          <Chatform
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
