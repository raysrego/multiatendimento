import { BarChart3, Users, Clock, MessageSquare, MessageCircle, PieChart, ArrowUpRight } from 'lucide-react';

const AnalyticsPage = () => {
  // Mock data for analytics
  const metrics = [
    {
      title: 'Total Conversations',
      value: '1,248',
      change: '+12%',
      icon: MessageSquare,
      color: 'bg-primary-500',
    },
    {
      title: 'Total Contacts',
      value: '854',
      change: '+5%',
      icon: Users,
      color: 'bg-secondary-500',
    },
    {
      title: 'Avg. Response Time',
      value: '3m 24s',
      change: '-18%',
      icon: Clock,
      color: 'bg-success-500',
      positive: false,
    },
    {
      title: 'Bot Conversations',
      value: '523',
      change: '+32%',
      icon: MessageCircle,
      color: 'bg-warning-500',
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-neutral-800 mb-6">Analytics Dashboard</h1>

        {/* Metrics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">{metric.title}</p>
                  <h3 className="text-2xl font-bold text-neutral-800">{metric.value}</h3>
                </div>
                <div className={`p-2 rounded-md ${metric.color} text-white`}>
                  <metric.icon size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    metric.positive === false
                      ? 'text-error-500'
                      : 'text-success-500'
                  }`}
                >
                  {metric.change}
                </span>
                <span className="text-sm text-neutral-500 ml-1">vs. last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Conversations Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-neutral-800">Conversations</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-success-600 flex items-center">
                  <ArrowUpRight size={16} className="mr-1" /> 18.2%
                </span>
                <select className="text-sm border rounded-md p-1 text-neutral-600 focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
              </div>
            </div>
            <div className="h-64 flex items-end space-x-4 pb-6 border-b border-neutral-100">
              {/* Mock bar chart - in a real app, you'd use a chart library */}
              {[40, 65, 45, 80, 75, 90, 60].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-primary-100 rounded-t-sm relative group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute inset-0 bg-primary-500 opacity-40 rounded-t-sm transform scale-0 group-hover:scale-100 transition-transform"></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-neutral-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {height} chats
                    </div>
                  </div>
                  <span className="text-xs text-neutral-500 mt-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-neutral-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
                <span>Human Agent</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-secondary-500 rounded-full mr-2"></div>
                <span>Chatbot</span>
              </div>
            </div>
          </div>

          {/* Resolution Time Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-neutral-800">Resolution Time</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-success-600 flex items-center">
                  <ArrowUpRight size={16} className="mr-1" /> 12.5%
                </span>
                <select className="text-sm border rounded-md p-1 text-neutral-600 focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
              </div>
            </div>
            {/* Mock area chart - in a real app, you'd use a chart library */}
            <div className="h-64 relative">
              <div className="absolute top-0 left-0 right-0 h-full flex flex-col justify-between pb-6">
                <div className="border-b border-dashed border-neutral-200 text-xs text-neutral-400 pl-2">
                  10m
                </div>
                <div className="border-b border-dashed border-neutral-200 text-xs text-neutral-400 pl-2">
                  8m
                </div>
                <div className="border-b border-dashed border-neutral-200 text-xs text-neutral-400 pl-2">
                  6m
                </div>
                <div className="border-b border-dashed border-neutral-200 text-xs text-neutral-400 pl-2">
                  4m
                </div>
                <div className="border-b border-dashed border-neutral-200 text-xs text-neutral-400 pl-2">
                  2m
                </div>
                <div className="text-xs text-neutral-400 pl-2">0</div>
              </div>

              <svg
                viewBox="0 0 300 100"
                className="w-full h-48 mt-8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,50 C30,40 60,70 90,50 C120,30 150,60 180,40 C210,20 240,30 270,20 L300,20 L300,100 L0,100 Z"
                  fill="rgba(56, 189, 248, 0.2)"
                  stroke="none"
                />
                <path
                  d="M0,50 C30,40 60,70 90,50 C120,30 150,60 180,40 C210,20 240,30 270,20 L300,20"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="2"
                />
              </svg>

              <div className="flex justify-between mt-2 px-2 text-xs text-neutral-500">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={i}>{day}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Satisfaction and Tags */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Satisfaction */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-neutral-800 mb-6">User Satisfaction</h3>
            <div className="flex items-center justify-center h-48">
              {/* Mock donut chart - in a real app, you'd use a chart library */}
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeDasharray="85, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="text-3xl font-bold text-neutral-800">85%</p>
                  <p className="text-xs text-neutral-500">Satisfied</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-neutral-50 p-3 rounded-md text-center">
                <p className="text-success-500 font-bold text-lg">76%</p>
                <p className="text-xs text-neutral-600">Positive</p>
              </div>
              <div className="bg-neutral-50 p-3 rounded-md text-center">
                <p className="text-neutral-500 font-bold text-lg">15%</p>
                <p className="text-xs text-neutral-600">Neutral</p>
              </div>
              <div className="bg-neutral-50 p-3 rounded-md text-center">
                <p className="text-error-500 font-bold text-lg">9%</p>
                <p className="text-xs text-neutral-600">Negative</p>
              </div>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-neutral-800 mb-6">Popular Tags</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-neutral-700">Support</span>
                  <span className="text-sm text-neutral-500">45%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-neutral-700">Sales</span>
                  <span className="text-sm text-neutral-500">30%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full">
                  <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-neutral-700">Product</span>
                  <span className="text-sm text-neutral-500">15%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full">
                  <div className="bg-warning-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-neutral-700">Returns</span>
                  <span className="text-sm text-neutral-500">7%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full">
                  <div className="bg-error-500 h-2 rounded-full" style={{ width: '7%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-neutral-700">Other</span>
                  <span className="text-sm text-neutral-500">3%</span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full">
                  <div className="bg-neutral-500 h-2 rounded-full" style={{ width: '3%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;