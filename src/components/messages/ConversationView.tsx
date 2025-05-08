
import React from 'react';
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Message } from "@/types/Message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ConversationViewProps {
  conversation: Message | null;
  replyText: string;
  setReplyText: (text: string) => void;
  handleSendReply: () => void;
  currentUser: string;
  currentUserAvatar?: string;
}

const ConversationView: React.FC<ConversationViewProps> = ({
  conversation,
  replyText,
  setReplyText,
  handleSendReply,
  currentUser,
  currentUserAvatar
}) => {
  if (!conversation) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center border-b pb-4 mb-4">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={conversation.avatar} alt={conversation.from} />
          <AvatarFallback>{conversation.from.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{conversation.from}</h3>
          <p className="text-sm text-muted-foreground">{conversation.email}</p>
        </div>
      </div>
      
      <div className="h-[300px] overflow-y-auto p-4 border rounded-md mb-4 bg-gray-50 space-y-4 flex-grow">
        {conversation.conversation.map((msg, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${
              msg.sender === currentUser ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-end gap-2">
              {msg.sender !== currentUser && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={conversation.avatar} alt={conversation.from} />
                  <AvatarFallback>{conversation.from.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              )}
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === currentUser 
                    ? "bg-artisan-stone text-white" 
                    : "bg-white border"
                }`}
              >
                <p>{msg.message}</p>
              </div>
              {msg.sender === currentUser && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUserAvatar} alt={currentUser} />
                  <AvatarFallback>{currentUser.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              )}
            </div>
            <span className="text-xs text-muted-foreground mt-1 px-10">
              {msg.sender}, {formatDate(msg.timestamp)}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2 mt-auto">
        <Textarea 
          placeholder="Type your message..." 
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
          disabled={!replyText.trim()}
        >
          <Send size={16} className="mr-2" />
          Send
        </Button>
      </div>
    </div>
  );
};

export default ConversationView;
