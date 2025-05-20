import { Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { Contact, useChatStore } from '../../stores/chatStore';
import clsx from 'clsx';

const ContactList = () => {
  const { contacts, selectedContactId, selectContact } = useChatStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);

  // Get unique tags from all contacts
  const tags = Array.from(
    new Set(
      contacts
        .flatMap((contact) => contact.tags || [])
        .filter(Boolean)
    )
  );

  const filteredContacts = contacts.filter((contact) => {
    // Filter by search query
    const matchesSearch =
      !searchQuery ||
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phoneNumber.includes(searchQuery);

    // Filter by tag
    const matchesTag = !filterTag || contact.tags?.includes(filterTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="h-full flex flex-col bg-white border-r">
      {/* Search and filter */}
      <div className="p-4 border-b">
        <div className="relative mb-3">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>

        {/* Tags filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterTag(null)}
            className={clsx(
              'px-3 py-1 text-xs rounded-full',
              !filterTag
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            )}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag === filterTag ? null : tag)}
              className={clsx(
                'px-3 py-1 text-xs rounded-full',
                tag === filterTag
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-neutral-500 p-4">
            <Search size={24} className="mb-2" />
            <p className="text-center">No contacts found.</p>
          </div>
        ) : (
          <ul>
            {filteredContacts.map((contact) => (
              <li key={contact.id}>
                <button
                  onClick={() => selectContact(contact.id)}
                  className={clsx(
                    'w-full flex items-start p-4 hover:bg-neutral-50 transition-colors border-b',
                    selectedContactId === contact.id ? 'bg-primary-50' : ''
                  )}
                >
                  <div className="relative mr-3">
                    {contact.profilePic ? (
                      <img
                        src={contact.profilePic}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center">
                        <span className="text-neutral-600 font-medium">
                          {contact.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div
                      className={clsx(
                        'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
                        contact.status === 'online'
                          ? 'bg-success-500'
                          : contact.status === 'typing'
                          ? 'bg-primary-500'
                          : 'bg-neutral-400'
                      )}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-neutral-800 truncate">
                        {contact.name}
                      </span>
                      <span className="text-xs text-neutral-500 whitespace-nowrap">
                        {contact.lastMessageTime}
                      </span>
                    </div>
                    <div className="text-sm text-neutral-600 truncate mt-1">
                      {contact.lastMessage}
                    </div>
                    <div className="flex items-center mt-1">
                      {contact.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-neutral-100 text-neutral-700 mr-1 px-1.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {contact.unreadCount > 0 && (
                    <div className="flex items-start ml-2">
                      <span className="bg-primary-500 text-white text-xs font-medium rounded-full px-1.5 min-w-[1.5rem] h-5 flex items-center justify-center">
                        {contact.unreadCount}
                      </span>
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ContactList;