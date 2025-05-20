import { useState } from 'react';
import { Bot, Plus, ToggleLeft as Toggle, ArrowRight, Pencil, Trash, Play, Pause } from 'lucide-react';
import { BotFlow, useChatbotStore } from '../stores/chatbotStore';
import clsx from 'clsx';

const ChatbotPage = () => {
  const { flows, selectedFlowId, selectFlow, addFlow, toggleFlowActive } = useChatbotStore();
  const [showNewFlowModal, setShowNewFlowModal] = useState(false);
  const [newFlowName, setNewFlowName] = useState('');
  const [newFlowDescription, setNewFlowDescription] = useState('');

  const selectedFlow = flows.find((flow) => flow.id === selectedFlowId);

  const handleCreateFlow = () => {
    if (newFlowName.trim()) {
      addFlow(newFlowName.trim(), newFlowDescription.trim());
      setNewFlowName('');
      setNewFlowDescription('');
      setShowNewFlowModal(false);
    }
  };

  return (
    <div className="h-full flex">
      {/* Sidebar with flows */}
      <div className="w-80 h-full bg-white border-r overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-neutral-800">Chatbot Flows</h2>
            <button
              onClick={() => setShowNewFlowModal(true)}
              className="p-2 text-primary-500 hover:bg-primary-50 rounded-md transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search flows..."
              className="w-full px-3 py-2 pl-8 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="p-2">
          {flows.map((flow) => (
            <button
              key={flow.id}
              onClick={() => selectFlow(flow.id)}
              className={clsx(
                'w-full flex items-start p-3 rounded-md mb-1 transition-colors',
                selectedFlowId === flow.id
                  ? 'bg-primary-50 text-primary-700'
                  : 'hover:bg-neutral-100'
              )}
            >
              <div
                className={clsx(
                  'p-2 rounded-md mr-3',
                  flow.isActive ? 'bg-success-100 text-success-700' : 'bg-neutral-100 text-neutral-500'
                )}
              >
                <Bot size={18} />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-neutral-800">{flow.name}</h3>
                  <div
                    className={clsx(
                      'text-xs px-2 py-0.5 rounded-full',
                      flow.isActive
                        ? 'bg-success-100 text-success-700'
                        : 'bg-neutral-100 text-neutral-500'
                    )}
                  >
                    {flow.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                  {flow.description}
                </p>
                <div className="flex items-center mt-2 text-xs text-neutral-500">
                  <span>{flow.nodes.length} nodes</span>
                  <span className="mx-2">•</span>
                  <span>Updated 2 days ago</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 h-full bg-neutral-50 p-6 overflow-y-auto">
        {selectedFlow ? (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-neutral-800">{selectedFlow.name}</h1>
                  <p className="text-neutral-500 mt-1">{selectedFlow.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleFlowActive(selectedFlow.id)}
                    className={clsx(
                      'flex items-center px-3 py-2 rounded-md transition-colors',
                      selectedFlow.isActive
                        ? 'bg-success-100 text-success-700 hover:bg-success-200'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    )}
                  >
                    {selectedFlow.isActive ? (
                      <>
                        <Pause size={16} className="mr-2" />
                        <span>Deactivate</span>
                      </>
                    ) : (
                      <>
                        <Play size={16} className="mr-2" />
                        <span>Activate</span>
                      </>
                    )}
                  </button>
                  <button className="p-2 text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors">
                    <Pencil size={18} />
                  </button>
                  <button className="p-2 text-error-500 hover:bg-error-50 rounded-md transition-colors">
                    <Trash size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-sm text-neutral-600 mt-2">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-success-500 mr-2"></div>
                  <span>Created: April 12, 2025</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-500 mr-2"></div>
                  <span>Updated: April 15, 2025</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-warning-500 mr-2"></div>
                  <span>Used: 152 times</span>
                </div>
              </div>
            </div>

            {/* Flow Editor */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b p-4 flex items-center justify-between">
                <h2 className="font-medium text-neutral-800">Flow Editor</h2>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 text-sm bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 transition-colors">
                    Test Flow
                  </button>
                  <button className="px-3 py-1.5 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="p-8 flex items-center justify-center min-h-[400px] bg-neutral-50 relative overflow-hidden">
                {/* Simple visualization of the flow - in a real app you'd use a flow chart library */}
                <div className="flex flex-col items-center">
                  {/* Start node */}
                  <div className="bg-success-500 text-white p-3 rounded-md mb-4 w-40 text-center">
                    <p className="font-medium">Start</p>
                  </div>

                  {/* Arrow */}
                  <div className="h-8 flex items-center justify-center text-neutral-400">
                    <ArrowRight size={20} />
                  </div>

                  {/* Message node */}
                  <div className="bg-primary-500 text-white p-3 rounded-md mb-4 w-64 text-center">
                    <p className="font-medium">Send Message</p>
                    <p className="text-xs mt-1 text-primary-100">
                      "Hello! Welcome to our support. How can I help you today?"
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="h-8 flex items-center justify-center text-neutral-400">
                    <ArrowRight size={20} />
                  </div>

                  {/* Decision node */}
                  <div className="bg-warning-500 text-white p-3 rounded-md mb-4 w-64 text-center">
                    <p className="font-medium">Decision</p>
                    <p className="text-xs mt-1 text-warning-100">
                      "What do you need help with?"
                    </p>
                  </div>

                  {/* Multiple paths */}
                  <div className="flex items-start space-x-8">
                    <div className="flex flex-col items-center">
                      <div className="h-8 flex items-center justify-center text-neutral-400">
                        <ArrowRight size={20} />
                      </div>
                      <div className="bg-secondary-500 text-white p-3 rounded-md w-40 text-center">
                        <p className="font-medium">Order Status</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="h-8 flex items-center justify-center text-neutral-400">
                        <ArrowRight size={20} />
                      </div>
                      <div className="bg-secondary-500 text-white p-3 rounded-md w-40 text-center">
                        <p className="font-medium">Product Info</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="h-8 flex items-center justify-center text-neutral-400">
                        <ArrowRight size={20} />
                      </div>
                      <div className="bg-secondary-500 text-white p-3 rounded-md w-40 text-center">
                        <p className="font-medium">Speak to Agent</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add Node Button - Positioned at bottom right */}
                <button className="absolute bottom-4 right-4 p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors shadow-md">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-neutral-500">
            <div className="bg-neutral-100 p-5 rounded-full mb-4">
              <Bot size={40} />
            </div>
            <h3 className="text-xl font-medium text-neutral-700">No Flow Selected</h3>
            <p className="mt-2 text-center max-w-md">
              Select a flow from the sidebar or create a new one to get started with building your
              chatbot.
            </p>
            <button
              onClick={() => setShowNewFlowModal(true)}
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors flex items-center"
            >
              <Plus size={18} className="mr-2" />
              <span>Create New Flow</span>
            </button>
          </div>
        )}
      </div>

      {/* New Flow Modal */}
      {showNewFlowModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-neutral-800 mb-4">Create New Flow</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Flow Name
              </label>
              <input
                type="text"
                value={newFlowName}
                onChange={(e) => setNewFlowName(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="e.g., Welcome Flow, Order Status Flow"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Description
              </label>
              <textarea
                value={newFlowDescription}
                onChange={(e) => setNewFlowDescription(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                rows={3}
                placeholder="Briefly describe what this flow will do..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNewFlowModal(false)}
                className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFlow}
                disabled={!newFlowName.trim()}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Flow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPage;