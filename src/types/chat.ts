export type ChatType = 'hostel' | 'city' | 'direct';

export interface MockUser {
  id: string;
  name: string;
  hostelId: string;
  cityName: string;
}

export interface MockMessage {
  id: string;
  senderId: string;
  chatType: ChatType;
  roomId: string; // e.g., hostel123, London, user1-user2
  content: string;
  timestamp: number;
}

export interface ChatRoom {
  chatType: ChatType;
  roomId: string;
  name: string; // Display name for the room
} 