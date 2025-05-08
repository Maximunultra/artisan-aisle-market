
export interface MessageItem {
  sender: string;
  message: string;
  timestamp: string;
}

export interface Message {
  id: number;
  from: string;
  email: string;
  preview: string;
  date: string;
  unread: boolean;
  conversation: MessageItem[];
  avatar?: string;
}
