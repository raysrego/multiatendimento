import { create } from 'zustand';

export type FlowNode = {
  id: string;
  type: 'start' | 'message' | 'decision' | 'action' | 'end';
  content: string;
  position: { x: number; y: number };
  next?: string | { [key: string]: string };
};

export type BotFlow = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  nodes: FlowNode[];
};

export type ChatbotState = {
  flows: BotFlow[];
  selectedFlowId: string | null;
  addFlow: (name: string, description: string) => void;
  updateFlow: (flowId: string, updates: Partial<Omit<BotFlow, 'id'>>) => void;
  deleteFlow: (flowId: string) => void;
  selectFlow: (flowId: string | null) => void;
  addNode: (flowId: string, node: Omit<FlowNode, 'id'>) => void;
  updateNode: (flowId: string, nodeId: string, updates: Partial<Omit<FlowNode, 'id'>>) => void;
  deleteNode: (flowId: string, nodeId: string) => void;
  toggleFlowActive: (flowId: string) => void;
};

// Sample chatbot flows
const sampleFlows: BotFlow[] = [
  {
    id: '1',
    name: 'Welcome Flow',
    description: 'Initial greeting and menu options',
    isActive: true,
    nodes: [
      {
        id: 'start1',
        type: 'start',
        content: 'Start',
        position: { x: 100, y: 100 },
        next: 'msg1',
      },
      {
        id: 'msg1',
        type: 'message',
        content: 'Hello! Welcome to our support. How can I help you today?',
        position: { x: 100, y: 200 },
        next: 'decision1',
      },
      {
        id: 'decision1',
        type: 'decision',
        content: 'What do you need help with?',
        position: { x: 100, y: 300 },
        next: {
          'Order Status': 'msg2',
          'Product Information': 'msg3',
          'Speak to an Agent': 'msg4',
        },
      },
      {
        id: 'msg2',
        type: 'message',
        content: 'Please provide your order number and I\'ll check the status for you.',
        position: { x: 0, y: 400 },
        next: 'end1',
      },
      {
        id: 'msg3',
        type: 'message',
        content: 'What product would you like to know more about?',
        position: { x: 100, y: 400 },
        next: 'end1',
      },
      {
        id: 'msg4',
        type: 'message',
        content: 'I\'ll connect you with the next available agent. Please wait a moment.',
        position: { x: 200, y: 400 },
        next: 'action1',
      },
      {
        id: 'action1',
        type: 'action',
        content: 'transferToAgent',
        position: { x: 200, y: 500 },
        next: 'end1',
      },
      {
        id: 'end1',
        type: 'end',
        content: 'End',
        position: { x: 100, y: 600 },
      },
    ],
  },
  {
    id: '2',
    name: 'Order Status Flow',
    description: 'Check the status of an order',
    isActive: false,
    nodes: [
      {
        id: 'start1',
        type: 'start',
        content: 'Start',
        position: { x: 100, y: 100 },
        next: 'msg1',
      },
      {
        id: 'msg1',
        type: 'message',
        content: 'Please enter your order number:',
        position: { x: 100, y: 200 },
        next: 'action1',
      },
      {
        id: 'action1',
        type: 'action',
        content: 'checkOrderStatus',
        position: { x: 100, y: 300 },
        next: 'decision1',
      },
      {
        id: 'decision1',
        type: 'decision',
        content: 'Order Status',
        position: { x: 100, y: 400 },
        next: {
          'Found': 'msg2',
          'Not Found': 'msg3',
        },
      },
      {
        id: 'msg2',
        type: 'message',
        content: 'Your order is {status}. It was shipped on {shipDate} and is expected to arrive on {deliveryDate}.',
        position: { x: 0, y: 500 },
        next: 'end1',
      },
      {
        id: 'msg3',
        type: 'message',
        content: 'Sorry, I couldn\'t find your order. Please check the order number and try again, or speak to an agent for assistance.',
        position: { x: 200, y: 500 },
        next: 'end1',
      },
      {
        id: 'end1',
        type: 'end',
        content: 'End',
        position: { x: 100, y: 600 },
      },
    ],
  },
];

export const useChatbotStore = create<ChatbotState>((set, get) => ({
  flows: sampleFlows,
  selectedFlowId: null,
  
  addFlow: (name, description) => {
    const newFlow: BotFlow = {
      id: Date.now().toString(),
      name,
      description,
      isActive: false,
      nodes: [
        {
          id: 'start1',
          type: 'start',
          content: 'Start',
          position: { x: 100, y: 100 },
          next: 'end1',
        },
        {
          id: 'end1',
          type: 'end',
          content: 'End',
          position: { x: 100, y: 300 },
        },
      ],
    };
    
    set((state) => ({
      flows: [...state.flows, newFlow],
      selectedFlowId: newFlow.id,
    }));
  },
  
  updateFlow: (flowId, updates) => {
    set((state) => ({
      flows: state.flows.map((flow) =>
        flow.id === flowId ? { ...flow, ...updates } : flow
      ),
    }));
  },
  
  deleteFlow: (flowId) => {
    set((state) => ({
      flows: state.flows.filter((flow) => flow.id !== flowId),
      selectedFlowId: state.selectedFlowId === flowId ? null : state.selectedFlowId,
    }));
  },
  
  selectFlow: (flowId) => {
    set({ selectedFlowId: flowId });
  },
  
  addNode: (flowId, node) => {
    const newNode: FlowNode = {
      id: Date.now().toString(),
      ...node,
    };
    
    set((state) => ({
      flows: state.flows.map((flow) =>
        flow.id === flowId
          ? { ...flow, nodes: [...flow.nodes, newNode] }
          : flow
      ),
    }));
  },
  
  updateNode: (flowId, nodeId, updates) => {
    set((state) => ({
      flows: state.flows.map((flow) =>
        flow.id === flowId
          ? {
              ...flow,
              nodes: flow.nodes.map((node) =>
                node.id === nodeId ? { ...node, ...updates } : node
              ),
            }
          : flow
      ),
    }));
  },
  
  deleteNode: (flowId, nodeId) => {
    set((state) => ({
      flows: state.flows.map((flow) =>
        flow.id === flowId
          ? {
              ...flow,
              nodes: flow.nodes.filter((node) => node.id !== nodeId),
            }
          : flow
      ),
    }));
  },
  
  toggleFlowActive: (flowId) => {
    set((state) => ({
      flows: state.flows.map((flow) =>
        flow.id === flowId
          ? { ...flow, isActive: !flow.isActive }
          : flow.isActive && flow.id !== flowId
          ? { ...flow, isActive: false } // Ensure only one flow is active
          : flow
      ),
    }));
  },
}));