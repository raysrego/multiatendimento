import React, { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, UserPlus, User, Tag, Phone } from 'lucide-react';
import { Contact, useChatStore } from '../stores/chatStore';
import clsx from 'clsx';

const ContactsPage = () => {
  const { contacts, selectContact } = useChatStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

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
    const matchesTag = !selectedTag || contact.tags?.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-white border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-neutral-800">Contacts</h1>
          <button className="flex items-center px-3 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
            <UserPlus size={18} className="mr-2" />
            <span>Add Contact</span>
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
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
          <div className="relative">
            <button className="flex items-center px-3 py-2 border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors">
              <Filter size={18} className="mr-2 text-neutral-500" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Tags filter */}
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={() => setSelectedTag(null)}
            className={clsx(
              'px-3 py-1 text-xs rounded-full',
              !selectedTag
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            )}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={clsx(
                'px-3 py-1 text-xs rounded-full',
                tag === selectedTag
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50 text-left text-sm text-neutral-500">
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Phone</th>
                <th className="p-4 font-medium">Tags</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-t hover:bg-neutral-50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      {contact.profilePic ? (
                        <img
                          src={contact.profilePic}
                          alt={contact.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center mr-3">
                          <span className="text-neutral-600 font-medium">
                            {contact.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-neutral-800">{contact.name}</p>
                        <p className="text-xs text-neutral-500">
                          Last message: {contact.lastMessageTime}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-neutral-700">{contact.phoneNumber}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div
                        className={clsx(
                          'w-2.5 h-2.5 rounded-full mr-2',
                          contact.status === 'online'
                            ? 'bg-success-500'
                            : contact.status === 'typing'
                            ? 'bg-primary-500'
                            : 'bg-neutral-400'
                        )}
                      ></div>
                      <span className="text-sm text-neutral-700 capitalize">
                        {contact.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => selectContact(contact.id)}
                        className="p-2 text-primary-500 hover:bg-primary-50 rounded-full transition-colors"
                        title="Chat"
                      >
                        <MessageSquare size={18} />
                      </button>
                      <button
                        className="p-2 text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
                        title="Call"
                      >
                        <Phone size={18} />
                      </button>
                      <button
                        className="p-2 text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
                        title="More Options"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredContacts.length === 0 && (
            <div className="p-8 text-center text-neutral-500">
              <User size={32} className="mx-auto mb-2" />
              <p>No contacts found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;