
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm your Artisanal assistant. How can I help you find the perfect handcrafted product today?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      let response = '';
      
      if (input.toLowerCase().includes('price') || input.toLowerCase().includes('cost')) {
        response = "Our handcrafted products range from ₱500 to ₱5000, depending on the complexity, materials, and time invested by our artisans. Each piece is unique and priced to reflect its exceptional quality and the fair compensation of our craftspeople.";
      } else if (input.toLowerCase().includes('shipping') || input.toLowerCase().includes('delivery')) {
        response = "We offer nationwide shipping within the Philippines, with free delivery for orders over ₱2500. International shipping is available to select countries. Delivery times typically range from 3-5 business days within Luzon and 5-7 business days for Visayas and Mindanao.";
      } else if (input.toLowerCase().includes('material') || input.toLowerCase().includes('made')) {
        response = "Our artisans work with a variety of sustainable, locally-sourced materials including abaca fiber, bamboo, clay, wood from managed forests, natural dyes, and upcycled materials. We prioritize eco-friendly practices in all our creations.";
      } else {
        response = "Thank you for your interest in our artisanal products! Our marketplace features unique handcrafted items made by skilled artisans from Legazpi City. Would you like recommendations for specific types of products or information about our artisans?";
      }
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed z-50 flex items-center justify-center right-6 bottom-6 w-14 h-14 rounded-full bg-artisan-stone text-white shadow-lg transition-all duration-300 hover:bg-artisan-forest ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open chat assistant"
      >
        <MessageSquare size={24} />
      </button>
      
      {/* Chat Window */}
      <div 
        className={`fixed z-50 right-6 bottom-6 w-80 md:w-96 bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform ${
          isOpen 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-20 opacity-0 pointer-events-none'
        } ${isMinimized ? 'h-16' : 'h-[500px]'}`}
      >
        {/* Chat Header */}
        <div className="bg-artisan-stone text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <MessageSquare size={20} className="mr-2" />
            <h3 className="font-medium">Artisanal Assistant</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleMinimize}
              className="text-white/80 hover:text-white transition-colors"
              aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
            >
              {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
            </button>
            <button 
              onClick={toggleChat}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div className="p-4 h-[380px] overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.sender === 'user' 
                        ? 'bg-artisan-stone text-white' 
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className={`text-xs mt-1 block ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-gray-200 rounded-2xl p-3 max-w-[80%]">
                    <div className="flex space-x-1 items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Ask about our products..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-artisan-stone"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="rounded-l-none bg-artisan-stone hover:bg-artisan-forest"
                  disabled={input.trim() === ''}
                  aria-label="Send message"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Chatbot;
