
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import MessagesList from './messages/MessagesList';
import ConversationView from './messages/ConversationView';
import { Message } from "@/types/Message";

interface MessageSystemProps {
  initialMessages: Message[];
  userType: 'customer' | 'seller';
  userName: string;
  userAvatar?: string;
}

const MessageSystem: React.FC<MessageSystemProps> = ({ 
  initialMessages, 
  userType,
  userName,
  userAvatar
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [isConversationOpen, setIsConversationOpen] = useState(false);
  const [currentConversation, setCurrentConversation] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  
  const { toast } = useToast();
  
  const openConversation = (message: Message) => {
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
      sender: userName,
      message: replyText,
      timestamp: new Date().toISOString(),
    };
    
    const updatedMessages = messages.map(msg => {
      if (msg.id === currentConversation.id) {
        return {
          ...msg,
          conversation: [...msg.conversation, newReply],
          preview: `${userType === 'seller' ? 'You' : userName}: ${replyText}`
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
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <MessagesList 
        messages={messages}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openConversation={openConversation}
      />
      
      <Dialog open={isConversationOpen} onOpenChange={setIsConversationOpen}>
        <DialogContent className="sm:max-w-[600px] sm:h-[600px] flex flex-col">
          <ConversationView 
            conversation={currentConversation}
            replyText={replyText}
            setReplyText={setReplyText}
            handleSendReply={handleSendReply}
            currentUser={userName}
            currentUserAvatar={userAvatar}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageSystem;
