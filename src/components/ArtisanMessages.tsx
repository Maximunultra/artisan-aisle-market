
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, MessageSquare, Send, ChevronRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Sample messages data
const initialMessages = [
  {
    id: 1,
    from: "Maria Santos",
    email: "maria@example.com",
    preview: "Hello! I was wondering if you have any other colors available for the ceramic vase?",
    date: "2 hours ago",
    unread: true,
    conversation: [
      {
        sender: "Maria Santos",
        message: "Hello! I was wondering if you have any other colors available for the ceramic vase?",
        timestamp: "2023-03-25T14:30:00Z",
      }
    ]
  },
  {
    id: 2,
    from: "John Diaz",
    email: "john@example.com",
    preview: "I received my abaca bag today and it's absolutely beautiful! Thank you so much for the careful packaging too.",
    date: "Yesterday",
    unread: false,
    conversation: [
      {
        sender: "John Diaz",
        message: "Hi there! Just wanted to check when my order might be shipped?",
        timestamp: "2023-03-23T10:15:00Z",
      },
      {
        sender: "You",
        message: "Hello John! Your order has been packed and will be shipped tomorrow. You'll receive a tracking number once it's on the way.",
        timestamp: "2023-03-23T11:20:00Z",
      },
      {
        sender: "John Diaz",
        message: "That's great! Thank you for the quick response.",
        timestamp: "2023-03-23T11:45:00Z",
      },
      {
        sender: "John Diaz",
        message: "I received my abaca bag today and it's absolutely beautiful! Thank you so much for the careful packaging too.",
        timestamp: "2023-03-24T15:30:00Z",
      }
    ]
  }
];

const ArtisanMessages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const [currentConversation, setCurrentConversation] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  
  const { toast } = useToast();
  
  const filteredMessages = messages.filter(msg => 
    msg.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const openConversation = (message: any) => {
    // Mark as read if it was unread
    if (message.unread) {
      const updatedMessages = messages.map(msg => {
        if (msg.id === message.id) {
          return { ...msg, unread: false };
        }
        return msg;
      });
      setMessages(updatedMessages);
    }
    
    setCurrentConversation(message);
    setIsConversationOpen(true);
  };
  
  const handleSendReply = () => {
    if (!replyText.trim() || !currentConversation) return;
    
    // Add reply to conversation
    const newReply = {
      sender: "You",
      message: replyText,
      timestamp: new Date().toISOString(),
    };
    
    const updatedMessages = messages.map(msg => {
      if (msg.id === currentConversation.id) {
        return {
          ...msg,
          conversation: [...msg.conversation, newReply],
          preview: `You: ${replyText}`
        };
      }
      return msg;
    });
    
    setMessages(updatedMessages);
    setCurrentConversation({
      ...currentConversation,
      conversation: [...currentConversation.conversation, newReply]
    });
    setReplyText('');
    
    toast({
      title: "Reply Sent",
      description: "Your message has been sent successfully.",
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-medium">Customer Messages</h2>
        
        <div className="relative flex-grow md:flex-grow-0 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            type="text" 
            placeholder="Search messages..." 
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
      </div>
      
      {filteredMessages.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <ul className="divide-y divide-artisan-sand/50">
            {filteredMessages.map((message) => (
              <li key={message.id} className="p-4 hover:bg-artisan-sand/10 transition-colors">
                <button 
                  className="w-full text-left flex justify-between items-center"
                  onClick={() => openConversation(message)}
                >
                  <div>
                    <h3 className="font-medium flex items-center">
                      {message.unread && (
                        <span className="w-2 h-2 bg-artisan-accent rounded-full mr-2" />
                      )}
                      {message.from}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                      {message.preview}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">{message.date}</span>
                    <ChevronRight size={16} className="text-muted-foreground" />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="flex justify-center mb-4">
            <MessageSquare size={64} className="text-artisan-sand" />
          </div>
          <h3 className="text-xl font-medium mb-2">No messages found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery 
              ? "No messages match your search criteria." 
              : "You don't have any messages yet."}
          </p>
        </div>
      )}
      
      {/* Conversation Dialog */}
      <Dialog open={isConversationOpen} onOpenChange={setIsConversationOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Conversation with {currentConversation?.from}</span>
              <span className="text-sm font-normal text-muted-foreground">{currentConversation?.email}</span>
            </DialogTitle>
          </DialogHeader>
          
          {currentConversation && (
            <>
              <div className="h-[300px] overflow-y-auto p-4 border rounded-md mb-4 bg-gray-50 space-y-4">
                {currentConversation.conversation.map((msg: any, index: number) => (
                  <div 
                    key={index} 
                    className={`flex flex-col ${
                      msg.sender === "You" ? "items-end" : "items-start"
                    }`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === "You" 
                          ? "bg-artisan-stone text-white" 
                          : "bg-white border"
                      }`}
                    >
                      <p>{msg.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      {msg.sender === "You" ? "You" : msg.sender}, {formatDate(msg.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Textarea 
                  placeholder="Type your reply..." 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendReply();
                    }
                  }}
                />
                <Button 
                  className="bg-artisan-stone hover:bg-artisan-forest flex-shrink-0 self-end"
                  onClick={handleSendReply}
                >
                  <Send size={16} className="mr-2" />
                  Send
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtisanMessages;
