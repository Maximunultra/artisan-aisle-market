
import React from 'react';
import { Search, MessageSquare, ChevronRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/types/Message";

interface MessagesListProps {
  messages: Message[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openConversation: (message: Message) => void;
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  searchQuery,
  setSearchQuery,
  openConversation
}) => {
  const filteredMessages = messages.filter(msg => 
    msg.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-medium">Messages</h2>
        
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
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={message.avatar} alt={message.from} />
                      <AvatarFallback>{message.from.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
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
    </div>
  );
};

export default MessagesList;
