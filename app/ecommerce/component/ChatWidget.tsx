"use client";

// Import React and its hooks for component state and lifecycle management
import React, { useState, useEffect, useRef } from "react";
// Import Font Awesome icons for the chat interface
// import { FaRobot, FaPaperPlane, FaTimes, FaCommentDots } from "react-icons/fa";
import {
  PencilIcon,
  PaperAirplaneIcon,
  CakeIcon,
  CommandLineIcon,
} from "@heroicons/react/20/solid";
import styles from "./chatwidget.module.css";

interface Message {
  text: string;
  isAgent: boolean;
}

// Main chat widget component
const ChatWidget = () => {
  // State to track if chat window is open or closed
  const [isOpen, setIsOpen] = useState(false);
  // State to store all chat messages (array of message objects)
  const [messages, setMessages] = useState<Message[]>([
    { text: "", isAgent: true },
  ]);
  // State to track current input field value
  const [inputValue, setInputValue] = useState("");
  // State to store conversation thread ID (null for new conversations)
  const [threadId, setThreadId] = useState(null);
  // Ref to reference the bottom of messages container for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effect hook: Show initial greeting when chat is first opened
  useEffect(() => {
    // Only run if chat is open AND no messages exist yet
    if (isOpen && messages.length === 0) {
      // Create initial greeting message
      const initialMessages = [
        {
          text: "Hello! I'm your shopping assistant. How can I help you today?", // Greeting text
          isAgent: true, // Flag to indicate this is from the AI agent
        },
      ];
      // Add greeting to messages state
      setMessages(initialMessages);
    }
  }, [isOpen, messages.length]); // Dependencies: re-run when isOpen or message count changes

  // Effect hook: Auto-scroll to bottom when new messages are added
  useEffect(() => {
    // Scroll the messages container to bottom smoothly
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Dependency: re-run whenever messages array changes

  // Function to toggle chat window open/closed
  const toggleChat = () => {
    // Flip the current isOpen state (true becomes false, false becomes true)
    setIsOpen(!isOpen);
  };

  // Function to handle changes in the input field
  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    // Update inputValue state with current text field value
    setInputValue(e.target.value);
  };

  // Log messages to console for debugging purposes
  console.log(messages);

  // Function to send user message and get AI response
  const handleSendMessage = async (e: { preventDefault: () => void }) => {
    // Prevent default form submission behavior (page refresh)
    e.preventDefault();
    // Log user input for debugging
    console.log(inputValue);

    // Create message object for user's input
    const message = {
      text: inputValue, // User's typed message
      isAgent: true, // Flag indicating this is from user, not AI
    };

    // Add user message to messages array using spread operator
    setMessages((prevMessages) => [...prevMessages, message]);
    // Clear input field immediately after sending
    setInputValue("");

    // Determine API endpoint: use existing thread if available, otherwise create new
    // const endpoint = threadId
    //   ? `http://localhost:8000/chat/${threadId}`
    //   : "http://localhost:8000/chat";

    try {
      // Make HTTP POST request to backend API
      // const response = await fetch(endpoint, {
      //   method: "POST", // HTTP method
      //   headers: {
      //     "Content-Type": "application/json", // Tell server we're sending JSON
      //   },
      //   body: JSON.stringify({
      //     message: inputValue, // Send user's message in request body
      //   }),
      // });

      // // Check if response status indicates success (200-299 range)
      // if (!response.ok) {
      //   // Throw error if response status indicates failure
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      // // Parse JSON response from server
      // const data = await response.json();
      // // Log successful response for debugging
      // console.log("Success:", data);
      const data = {
        response: "data.response", // AI's response text
        isAgent: true, // Flag indicating this is from AI agent
        threadId: null,
      };

      // Create message object for AI agent's response
      const agentResponse = {
        text: data.response, // AI's response text
        isAgent: true, // Flag indicating this is from AI agent
        threadId: data.threadId, // Thread ID for conversation continuity
      };

      // Add AI response to messages array
      setMessages((prevMessages) => [...prevMessages, agentResponse]);
      // Update thread ID for future messages in this conversation
      setThreadId(data.threadId);
      // Log updated messages for debugging
      console.log(messages);
    } catch (error) {
      // Log any errors that occur during API call
      console.error("Error:", error);
    }
  };
  //className={`{chat-widget-container} ${isOpen ? "open" : ""}`}
  // Render the chat widget UI
  return (
    // Main container with conditional CSS class based on open/closed state
    <div
      className={`fixed bottom-5 right-5 z-[1000] flex flex-col overflow-hidden shadow-[0_5px_40px_rgba(0,0,0,0.16)] transition-all duration-300 ease-in-out ${
        isOpen
          ? "h-[500px] w-[350px] rounded-xl bg-white"
          : "h-auto w-auto rounded-full bg-transparent"
      }`}
    >
      {/* Conditional rendering: show chat interface if open, otherwise show chat button */}
      {isOpen ? (
        <>
          {/* Chat header with title and close button */}
          <div className="flex items-center justify-between bg-gradient-to-br from-[#4a00e0] to-[#8e2de2] p-4 text-white">
            <div className="flex items-center gap-2.5">
              {/* Robot icon */}
              <PencilIcon className="h-5 w-5" />
              {/* Chat title text */}
              <h3 className="m-0 text-base font-semibold">Shop Assistant</h3>
            </div>
            {/* Close button with X icon */}
            <button
              className="cursor-pointer border-none bg-transparent text-lg text-white"
              onClick={toggleChat}
            >
              {/* <FaTimes /> */}
              <CakeIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Messages container */}
          <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-4">
            {/* Map through messages array to render each message */}
            {messages.map((message, index) => (
              // Container for each message (key prop required for React lists)
              <div
                key={index}
                className={`flex w-full ${
                  message.isAgent ? "justify-start" : "justify-end"
                }`}
              >
                {/* Message bubble with conditional CSS class for styling */}
                <div
                  className={`mb-1.5 max-w-[80%] rounded-[18px] px-4 py-2.5 text-sm leading-[1.4] ${
                    message.isAgent
                      ? "rounded-bl-[5px] bg-[#f0f2f5] text-[#333]"
                      : "rounded-br-[5px] bg-[#4a00e0] text-white"
                  }`}
                >
                  {/* Display message text */}
                  {message.text}
                </div>
              </div>
            ))}

            {/* Invisible div at bottom for auto-scroll reference */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form for sending messages */}
          <form
            className="flex border-t border-[#e6e6e6] p-2.5"
            onSubmit={handleSendMessage}
          >
            {/* Text input field */}
            <input
              type="text" // Input type
              className="flex-1 rounded-[20px] border border-[#e6e6e6] px-4 py-2.5 text-sm outline-none focus:border-[#4a00e0]" // CSS class for styling
              placeholder="Type your message..." // Placeholder text
              value={inputValue} // Controlled input value
              onChange={handleInputChange} // Handle input changes
            />
            {/* Send button */}
            <button
              type="submit" // Submit form when clicked
              className="ml-2.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-[#4a00e0] text-white hover:bg-[#3700b3] disabled:cursor-not-allowed disabled:bg-[#cccccc]" // CSS class for styling
              disabled={inputValue.trim() === ""} // Disable if input is empty or whitespace
            >
              {/* Paper plane icon for send button */}
              <PaperAirplaneIcon className="h-4 w-4" />
            </button>
          </form>
        </>
      ) : (
        /* Chat toggle button (shown when chat is closed) */
        <button
          className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full border-none bg-[#4a00e0] text-2xl text-white hover:bg-[#3700b3]"
          onClick={toggleChat}
        >
          {/* Comment/chat icon */}
          {/* <FaCommentDots /> */}
          <CommandLineIcon />
        </button>
      )}
    </div>
  );
};

// Export component as default export
export default ChatWidget;
