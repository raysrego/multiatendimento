import { useState } from 'react';
import { User, Key, Bell, Globe, Bot, Database, Save } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import clsx from 'clsx';

const SettingsPage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integration', label: 'WhatsApp Integration', icon: Globe },
    { id: 'chatbot', label: 'Chatbot Settings', icon: Bot },
    { id: 'data', label: 'Data Management', icon: Database },
  ];

  return (
    <div className="h-full bg-neutral-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-6">Settings</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex">
            {/* Tabs */}
            <div className="w-64 border-r">
              <nav className="p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                      'w-full flex items-center px-4 py-3 rounded-md mb-1 transition-colors',
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    )}
                  >
                    <tab.icon size={18} className="mr-3" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold text-neutral-800 mb-6">Profile Settings</h2>

                  <div className="flex items-start mb-8">
                    <div className="mr-6">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center">
                          <span className="text-neutral-600 font-medium text-2xl">
                            {user?.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <button className="mt-3 px-3 py-1.5 text-sm bg-neutral-100 text-neutral-700 rounded-md w-full hover:bg-neutral-200 transition-colors">
                        Change Photo
                      </button>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            defaultValue={user?.name}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            defaultValue={user?.email}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Role
                          </label>
                          <select className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500">
                            <option value="agent" selected={user?.role === 'agent'}>
                              Agent
                            </option>
                            <option value="supervisor" selected={user?.role === 'supervisor'}>
                              Supervisor
                            </option>
                            <option value="admin" selected={user?.role === 'admin'}>
                              Administrator
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            defaultValue="+1 (555) 123-4567"
                            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          rows={3}
                          defaultValue="Customer support specialist with 5 years of experience in handling inquiries and resolving customer issues."
                          className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <button className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                      <Save size={18} className="mr-2" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'integration' && (
                <div>
                  <h2 className="text-xl font-semibold text-neutral-800 mb-6">
                    WhatsApp Integration
                  </h2>

                  <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-5 mb-6">
                    <div className="flex items-start">
                      <div className="p-2 bg-primary-500 text-white rounded-md mr-4">
                        <Globe size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-800">Connection Status</h3>
                        <div className="flex items-center mt-1">
                          <div className="w-3 h-3 rounded-full bg-success-500 mr-2"></div>
                          <span className="text-sm text-success-700">Connected</span>
                        </div>
                        <p className="text-sm text-neutral-600 mt-2">
                          Your WhatsApp Business API is properly configured and working.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-neutral-800 mb-3">API Configuration</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            WhatsApp Business ID
                          </label>
                          <input
                            type="text"
                            value="123456789012345"
                            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            API Key
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              value="••••••••••••••••••••••••••"
                              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-primary-500">
                              Show
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-neutral-800 mb-3">Webhook Configuration</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Webhook URL
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value="https://your-domain.com/api/whatsapp/webhook"
                              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                              readOnly
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-primary-500">
                              Copy
                            </button>
                          </div>
                          <p className="mt-1 text-xs text-neutral-500">
                            Add this URL in your WhatsApp Business API dashboard.
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            Verify Token
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value="3d7b9f1a-e8c2-4b0d-8c1a-5f7b9e3d2a6c"
                              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                              readOnly
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-primary-500">
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-neutral-800 mb-3">Phone Numbers</h3>
                      <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-neutral-50 text-left text-sm text-neutral-500">
                              <th className="p-3 font-medium">Number</th>
                              <th className="p-3 font-medium">Status</th>
                              <th className="p-3 font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="p-3">+1 (555) 123-4567</td>
                              <td className="p-3">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                                  Active
                                </span>
                              </td>
                              <td className="p-3">
                                <button className="text-primary-500 hover:text-primary-700">
                                  Edit
                                </button>
                              </td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3">+1 (555) 987-6543</td>
                              <td className="p-3">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
                                  Inactive
                                </span>
                              </td>
                              <td className="p-3">
                                <button className="text-primary-500 hover:text-primary-700">
                                  Edit
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <button className="mt-3 text-sm text-primary-500 hover:text-primary-700">
                        + Add another phone number
                      </button>
                    </div>

                    <div className="border-t pt-6">
                      <button className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                        <Save size={18} className="mr-2" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab !== 'profile' && activeTab !== 'integration' && (
                <div className="flex flex-col items-center justify-center h-80 text-neutral-500">
                  <div className="bg-neutral-100 p-4 rounded-full mb-4">
                    {tabs.find((tab) => tab.id === activeTab)?.icon({ size: 32 })}
                  </div>
                  <h3 className="text-xl font-medium text-neutral-700">
                    {tabs.find((tab) => tab.id === activeTab)?.label}
                  </h3>
                  <p className="mt-2 text-center">
                    This section is under development and will be available soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;