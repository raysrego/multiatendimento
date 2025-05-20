import { create } from 'zustand';
import { format } from 'date-fns';

export type Message = {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'agent' | 'bot';
  status: 'sent' | 'delivered' | 'read';
  attachments?: Array<{
    id: string;
    type: 'image' | 'document' | 'audio';
    url: string;
    name: string;
  }>;
};

export type Contact = {
  id: string;
  name: string;
  phoneNumber: string;
  profilePic?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  status: 'online' | 'offline' | 'typing';
  tags?: string[];
  assignedTo?: string;
};

export type ChatState = {
  contacts: Contact[];
  selectedContactId: string | null;
  messages: Record<string, Message[]>;
  agentStatus: 'online' | 'away' | 'offline';
  queueCount: number;
  setAgentStatus: (status: 'online' | 'away' | 'offline') => void;
  selectContact: (contactId: string) => void;
  sendMessage: (contactId: string, content: string) => void;
  getContactMessages: (contactId: string) => Message[];
  assignContactToAgent: (contactId: string, agentId: string) => void;
  markMessagesAsRead: (contactId: string) => void;
};

// Generate mock data
const generateMockContacts = (): Contact[] => {
  return [
    {
      id: '1',
      name: 'John Doe',
      phoneNumber: '+1234567890',
      profilePic: 'https://i.pravatar.cc/150?img=5',
      lastMessage: 'Hi, I need help with my order',
      lastMessageTime: '11:45 AM',
      unreadCount: 3,
      status: 'online',
      tags: ['customer', 'support'],
    },
    {
      id: '2',
      name: 'Jane Smith',
      phoneNumber: '+1987654321',
      profilePic: 'https://i.pravatar.cc/150?img=6',
      lastMessage: 'When will my order arrive?',
      lastMessageTime: '10:30 AM',
      unreadCount: 0,
      status: 'offline',
      tags: ['customer', 'sales'],
      assignedTo: '3',
    },
    {
      id: '3',
      name: 'Robert Johnson',
      phoneNumber: '+1122334455',
      profilePic: 'https://i.pravatar.cc/150?img=7',
      lastMessage: 'Thanks for your help!',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      status: 'offline',
      tags: ['customer'],
    },
    {
      id: '4',
      name: 'Sarah Williams',
      phoneNumber: '+1555666777',
      profilePic: 'https://i.pravatar.cc/150?img=8',
      lastMessage: 'I want to return this product',
      lastMessageTime: 'Yesterday',
      unreadCount: 2,
      status: 'typing',
      tags: ['customer', 'support'],
    },
    {
      id: '5',
      name: 'Michael Brown',
      phoneNumber: '+1777888999',
      profilePic: 'https://i.pravatar.cc/150?img=9',
      lastMessage: 'Do you have this in stock?',
      lastMessageTime: '2 days ago',
      unreadCount: 0,
      status: 'offline',
      tags: ['customer', 'sales'],
    },
  ];
};

const generateMockMessages = (): Record<string, Message[]> => {
  const messages: Record<string, Message[]> = {};
  
  // Messages for John Doe
  messages['1'] = [
    {
      id: '101',
      content: 'Hello, I need help with my recent order #12345',
      timestamp: '11:30 AM',
      sender: 'user',
      status: 'read',
    },
    {
      id: '102',
      content: 'Hi John, I\'d be happy to help you with your order. What seems to be the problem?',
      timestamp: '11:35 AM',
      sender: 'agent',
      status: 'read',
    },
    {
      id: '103',
      content: 'I haven\'t received it yet and it\'s been a week since I ordered.',
      timestamp: '11:40 AM',
      sender: 'user',
      status: 'read',
    },
    {
      id: '104',
      content: 'Let me check the status of your order.',
      timestamp: '11:42 AM',
      sender: 'agent',
      status: 'read',
    },
    {
      id: '105',
      content: 'I see that your order is currently in transit. It should be delivered by tomorrow.',
      timestamp: '11:44 AM',
      sender: 'agent',
      status: 'read',
    },
    {
      id: '106',
      content: 'But I paid for express shipping, it should have arrived already!',
      timestamp: '11:45 AM',
      sender: 'user',
      status: 'delivered',
    },
  ];
  
  // Messages for Jane Smith
  messages['2'] = [
    {
      id: '201',
      content: 'When will my order arrive?',
      timestamp: '10:30 AM',
      sender: 'user',
      status: 'read',
    },
    {
      id: '202',
      content: 'Your order #54321 is scheduled for delivery tomorrow between 9 AM and 12 PM.',
      timestamp: '10:32 AM',
      sender: 'agent',
      status: 'read',
    },
    {
      id: '203',
      content: 'Great, thank you!',
      timestamp: '10:35 AM',
      sender: 'user',
      status: 'read',
    },
  ];
  
  // Add empty arrays for other contacts to avoid undefined errors
  messages['3'] = [];
  messages['4'] = [];
  messages['5'] = [];
  
  return messages;
};

export const useChatStore = create<ChatState>((set, get) => ({
  contacts: generateMockContacts(),
  selectedContactId: null,
  messages: generateMockMessages(),
  agentStatus: 'online',
  queueCount: 3,
  
  setAgentStatus: (status) => set({ agentStatus: status }),
  
  selectContact: (contactId) => {
    set({ selectedContactId: contactId });
    get().markMessagesAsRead(contactId);
  },
  
  sendMessage: (contactId, content) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: format(new Date(), 'h:mm a'),
      sender: 'agent',
      status: 'sent',
    };
    
    // Update messages
    set((state) => ({
      messages: {
        ...state.messages,
        [contactId]: [...(state.messages[contactId] || []), newMessage],
      },
    }));
    
    // Update last message for contact
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              lastMessage: content,
              lastMessageTime: format(new Date(), 'h:mm a'),
            }
          : contact
      ),
    }));
    
    // Simulate user response after a delay
    if (contactId === '1' || contactId === '2') {
      setTimeout(() => {
        const responses = [
          "Thank you for the information.",
          "I understand, that's helpful.",
          "I appreciate your assistance.",
          "Great, that solves my problem!",
          "I'll wait for the update then.",
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const userReply: Message = {
          id: Date.now().toString(),
          content: randomResponse,
          timestamp: format(new Date(), 'h:mm a'),
          sender: 'user',
          status: 'delivered',
        };
        
        set((state) => ({
          messages: {
            ...state.messages,
            [contactId]: [...(state.messages[contactId] || []), userReply],
          },
          contacts: state.contacts.map((contact) =>
            contact.id === contactId
              ? {
                  ...contact,
                  lastMessage: randomResponse,
                  lastMessageTime: format(new Date(), 'h:mm a'),
                  unreadCount: contact.unreadCount + 1,
                }
              : contact
          ),
        }));
      }, 5000 + Math.random() * 5000);
    }
  },
  
  getContactMessages: (contactId) => {
    return get().messages[contactId] || [];
  },
  
  assignContactToAgent: (contactId, agentId) => {
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === contactId
          ? { ...contact, assignedTo: agentId }
          : contact
      ),
    }));
  },
  
  markMessagesAsRead: (contactId) => {
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === contactId
          ? { ...contact, unreadCount: 0 }
          : contact
      ),
      messages: {
        ...state.messages,
        [contactId]: (state.messages[contactId] || []).map((message) =>
          message.sender === 'user' && message.status !== 'read'
            ? { ...message, status: 'read' }
            : message
        ),
      },
    }));
  },
}));