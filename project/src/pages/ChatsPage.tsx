import { useState } from 'react';
import ContactList from '../components/chat/ContactList';
import ChatContainer from '../components/chat/ChatContainer';
import { useChatStore } from '../stores/chatStore';
import { MessageSquare } from 'lucide-react';

const ChatsPage = () => {
  const { contacts, selectedContactId } = useChatStore();
  
  const selectedContact = contacts.find((contact) => contact.id === selectedContactId);

  return (
    <div className="h-full flex">
      {/* Contact list */}
      <div className="w-80 h-full">
        <ContactList />
      </div>

      {/* Chat area */}
      <div className="flex-1 h-full">
        {selectedContact ? (
          <ChatContainer contact={selectedContact} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-neutral-50 text-neutral-500">
            <div className="bg-neutral-100 p-5 rounded-full mb-4">
              <MessageSquare size={40} />
            </div>
            <h3 className="text-xl font-medium text-neutral-700">WhatsApp Conversations</h3>
            <p className="mt-2 text-center max-w-sm">
              Select a contact to view your conversation history and chat in real-time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;