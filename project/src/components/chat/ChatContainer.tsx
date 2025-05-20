import { useEffect, useRef, useState } from 'react';
import { Paperclip, Send, Info, Phone, Video } from 'lucide-react';
import { Contact, Message, useChatStore } from '../../stores/chatStore';
import clsx from 'clsx';

const ChatContainer = ({ contact }: { contact: Contact }) => {
  const { getContactMessages, sendMessage } = useChatStore();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get messages for this contact
    setMessages(getContactMessages(contact.id));
  }, [contact.id, getContactMessages]);

  useEffect(() => {
    // Scroll to the bottom of the chat
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(contact.id, newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Chat header */}
      <div className="px-4 py-3 bg-white border-b flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative mr-3">
            {contact.profilePic ? (
              <img
                src={contact.profilePic}
                alt={contact.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
                <span className="text-neutral-600 font-medium">
                  {contact.name.charAt(0)}
                </span>
              </div>
            )}
            <div
              className={clsx(
                'absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white',
                contact.status === 'online'
                  ? 'bg-success-500'
                  : contact.status === 'typing'
                  ? 'bg-primary-500'
                  : 'bg-neutral-400'
              )}
            ></div>
          </div>
          <div>
            <h2 className="font-medium text-neutral-800">{contact.name}</h2>
            <p className="text-xs text-neutral-500">
              {contact.status === 'typing'
                ? 'typing...'
                : contact.status === 'online'
                ? 'online'
                : 'last seen recently'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors">
            <Phone size={20} />
          </button>
          <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors">
            <Video size={20} />
          </button>
          <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors">
            <Info size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-neutral-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={clsx(
                'max-w-[75%] rounded-lg p-3 break-words',
                message.sender === 'agent'
                  ? 'bg-primary-100 ml-auto rounded-br-none'
                  : message.sender === 'bot'
                  ? 'bg-secondary-100 rounded-bl-none'
                  : 'bg-white rounded-bl-none shadow-sm'
              )}
            >
              <div className="text-neutral-800">{message.content}</div>
              <div className="flex items-center justify-end mt-1 space-x-1">
                <span className="text-xs text-neutral-500">
                  {message.timestamp}
                </span>
                {message.sender === 'agent' && (
                  <span className="text-xs">
                    {message.status === 'sent' ? (
                      '✓'
                    ) : message.status === 'delivered' ? (
                      '✓✓'
                    ) : (
                      <span className="text-primary-500">✓✓</span>
                    )}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-3 bg-white border-t">
        <div className="flex items-center bg-neutral-100 rounded-lg px-3 py-2">
          <button className="text-neutral-500 hover:text-neutral-700 p-1">
            <Paperclip size={20} />
          </button>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-20 py-1 px-2"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={clsx(
              'p-2 rounded-full',
              newMessage.trim()
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            )}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;