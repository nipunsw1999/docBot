import ReactMarkdown from "react-markdown";
import Chatboticon from "./Chatboticon";
import remarkGfm from "remark-gfm";
import Select from "react-select";

const ChatMessage = ({ chat }) => {
  const isBot = chat.role === "model";

  return (
    <div className={`message ${isBot ? "bot" : "user"}-message`}>
      {isBot && <Chatboticon />}
      {isBot ? (
        <div className="message-text">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children, ...props }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              ),
            }}
          >
            {chat.text}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="message-text">{chat.text}</p>
      )}
    </div>
  );
};

export default ChatMessage;
