
import React from 'react';
import MessageSystem from './MessageSystem';
import { Message } from '@/types/Message';

// Sample messages data
const initialMessages: Message[] = [
  {
    id: 1,
    from: "Maria Santos",
    email: "maria@example.com",
    preview: "Hello! I was wondering if you have any other colors available for the ceramic vase?",
    date: "2 hours ago",
    unread: true,
    avatar: "/placeholder.svg",
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
    avatar: "/placeholder.svg",
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
  return (
    <MessageSystem 
      initialMessages={initialMessages}
      userType="seller"
      userName="You"
      userAvatar="/placeholder.svg"
    />
  );
};

export default ArtisanMessages;
