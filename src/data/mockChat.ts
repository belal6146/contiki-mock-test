import { MockUser, MockMessage } from '@/types/chat';

// Mock users
export const mockUsers: MockUser[] = [
  { id: 'user1', name: 'Alice', hostelId: 'hostel123', cityName: 'London' },
  { id: 'user2', name: 'Bob', hostelId: 'hostel123', cityName: 'London' },
  { id: 'user3', name: 'Charlie', hostelId: 'hostel456', cityName: 'Paris' },
  { id: 'user4', name: 'Diana', hostelId: 'hostel456', cityName: 'Paris' },
  { id: 'user5', name: 'Eve', hostelId: 'hostel789', cityName: 'Berlin' },
];

// Mock messages
export const mockMessages: MockMessage[] = [
  // Hostel chat messages
  {
    id: 'm1',
    senderId: 'user1',
    chatType: 'hostel',
    roomId: 'hostel123',
    content: 'Hey everyone! Anyone up for a pub crawl tonight?',
    timestamp: Date.now() - 1000 * 60 * 60,
  },
  {
    id: 'm2',
    senderId: 'user2',
    chatType: 'hostel',
    roomId: 'hostel123',
    content: 'Count me in! What time are we meeting?',
    timestamp: Date.now() - 1000 * 60 * 55,
  },
  {
    id: 'g1',
    senderId: 'user1',
    chatType: 'hostel',
    roomId: 'hostel123',
    content: 'Welcome to the group chat, everyone!',
    timestamp: Date.now() - 1000 * 60 * 120,
  },
  {
    id: 'g2',
    senderId: 'user2',
    chatType: 'hostel',
    roomId: 'hostel123',
    content: 'Hi all! Looking forward to meeting you in person.',
    timestamp: Date.now() - 1000 * 60 * 110,
  },
  {
    id: 'g3',
    senderId: 'user3',
    chatType: 'hostel',
    roomId: 'hostel123',
    content: 'Anyone want to plan a group dinner on the first night?',
    timestamp: Date.now() - 1000 * 60 * 100,
  },
  // City chat messages
  {
    id: 'm3',
    senderId: 'user3',
    chatType: 'city',
    roomId: 'London',
    content: 'Anyone want to check out the British Museum tomorrow?',
    timestamp: Date.now() - 1000 * 60 * 50,
  },
  // Direct messages
  {
    id: 'm4',
    senderId: 'user1',
    chatType: 'direct',
    roomId: 'user1-user2',
    content: 'Hey Bob, want to grab lunch later?',
    timestamp: Date.now() - 1000 * 60 * 45,
  },
  {
    id: 'm5',
    senderId: 'user2',
    chatType: 'direct',
    roomId: 'user1-user2',
    content: "Sure, Alice! Let me know when you're ready.",
    timestamp: Date.now() - 1000 * 60 * 44,
  },
]; 