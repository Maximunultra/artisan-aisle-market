
import React from 'react';
import MessageSystem from './MessageSystem';
import { Message } from '@/types/Message';

// Sample messages data for customer
const initialMessages: Message[] = [
  {
    id: 1,
    from: "Abaca Crafts Shop",
    email: "abacacrafts@example.com",
    preview: "Thank you for your interest in our products! How can we help you today?",
    date: "1 day ago",
    unread: true,
    avatar: "/placeholder.svg",
    conversation: [
      {
        sender: "Maria Lopez",
        message: "Hi, I'm interested in purchasing some of your handwoven baskets. Do you ship internationally?",
        timestamp: "2023-03-24T10:30:00Z",
      },
      {
        sender: "Abaca Crafts Shop",
        message: "Thank you for your interest in our products! Yes, we do ship internationally. Shipping costs will vary depending on your location.",
        timestamp: "2023-03-24T11:45:00Z",
      }
    ]
  },
  {
    id: 2,
    from: "Ceramic Artisan Shop",
    email: "ceramics@example.com",
    preview: "Your order has been shipped! Here's your tracking number: LGP78945621.",
    date: "3 days ago",
    unread: false,
    avatar: "/placeholder.svg",
    conversation: [
      {
        sender: "Maria Lopez",
        message: "Hello! I'd like to order the blue ceramic vase I saw on your profile.",
        timestamp: "2023-03-20T09:15:00Z",
      },
      {
        sender: "Ceramic Artisan Shop",
        message: "Hi Maria! Thank you for your interest. The blue ceramic vase is available. Would you like to proceed with the purchase?",
        timestamp: "2023-03-20T10:30:00Z",
      },
      {
        sender: "Maria Lopez",
        message: "Yes, I'd like to buy it. How do I proceed with payment?",
        timestamp: "2023-03-20T11:00:00Z",
      },
      {
        sender: "Ceramic Artisan Shop",
        message: "You can complete your purchase through our checkout page. I've just sent you a direct link via email.",
        timestamp: "2023-03-20T11:45:00Z",
      },
      {
        sender: "Ceramic Artisan Shop",
        message: "Your order has been shipped! Here's your tracking number: LGP78945621.",
        timestamp: "2023-03-22T14:30:00Z",
      }
    ]
  }
];

const CustomerMessages = () => {
  return (
    <MessageSystem 
      initialMessages={initialMessages}
      userType="customer"
      userName="Maria Lopez"
      userAvatar="/placeholder.svg"
    />
  );
};

export default CustomerMessages;
