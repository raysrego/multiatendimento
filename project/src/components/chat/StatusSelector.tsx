import { Check, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../../stores/chatStore';
import clsx from 'clsx';

const statusOptions = [
  { id: 'online', label: 'Online', color: 'bg-success-500' },
  { id: 'away', label: 'Away', color: 'bg-warning-500' },
  { id: 'offline', label: 'Offline', color: 'bg-neutral-400' },
];

const StatusSelector = () => {
  const { agentStatus, setAgentStatus } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentStatus = statusOptions.find((option) => option.id === agentStatus);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectStatus = (status: 'online' | 'away' | 'offline') => {
    setAgentStatus(status);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full flex items-center justify-between px-3 py-2 bg-neutral-100 rounded-md hover:bg-neutral-200 transition-colors"
      >
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${currentStatus?.color} mr-2`}></div>
          <span className="text-sm text-neutral-700">{currentStatus?.label}</span>
        </div>
        <ChevronDown size={16} className="text-neutral-500" />
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 animate-fade-in">
          <ul className="py-1">
            {statusOptions.map((option) => (
              <li key={option.id}>
                <button
                  onClick={() => handleSelectStatus(option.id as 'online' | 'away' | 'offline')}
                  className={clsx(
                    'w-full flex items-center px-3 py-2 text-sm hover:bg-neutral-100',
                    option.id === agentStatus ? 'bg-neutral-50' : ''
                  )}
                >
                  <div className={`w-3 h-3 rounded-full ${option.color} mr-2`}></div>
                  <span className="flex-1 text-left">{option.label}</span>
                  {option.id === agentStatus && (
                    <Check size={16} className="text-primary-500" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StatusSelector;