import React, { useState, useEffect, useRef } from 'react';
import { mockUsers, mockMessages } from '@/data/mockChat';
import { MockUser, MockMessage, ChatType } from '@/types/chat';

// Feature flag for enabling/disabling the chat module
export const ENABLE_MOCK_CHAT = true;

interface ChatModuleProps {
  currentUserId: string;
  targetUserId?: string; // Optional for group chat
  onClose: () => void;
  chatType?: ChatType; // 'direct' or 'hostel'
  roomId?: string; // Required for group chat
}

const getRoomId = (userA: string, userB: string) => {
  return [userA, userB].sort().join('-');
};

export const ChatModule: React.FC<ChatModuleProps> = ({ currentUserId, targetUserId, onClose, chatType = 'direct', roomId }) => {
  const [messages, setMessages] = useState<MockMessage[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // For direct messages, compute roomId from user IDs
  const dmRoomId = targetUserId ? getRoomId(currentUserId, targetUserId) : undefined;
  const currentUser = mockUsers.find(u => u.id === currentUserId);
  const targetUser = targetUserId ? mockUsers.find(u => u.id === targetUserId) : undefined;

  useEffect(() => {
    if (chatType === 'hostel' && roomId) {
      setMessages(mockMessages.filter(m => m.chatType === 'hostel' && m.roomId === roomId));
      console.log(`[Chat] Opened GROUP chat for room ${roomId}`);
    } else if (chatType === 'direct' && dmRoomId) {
      setMessages(
        mockMessages.filter(
          m => m.chatType === 'direct' && getRoomId(m.senderId, m.roomId.replace(/-.*/, '')) === dmRoomId
        )
      );
      console.log(`[Chat] Opened DM between ${currentUserId} and ${targetUserId}`);
    }
  }, [chatType, roomId, currentUserId, targetUserId, dmRoomId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: MockMessage = {
      id: `m${Date.now()}`,
      senderId: currentUserId,
      chatType: chatType,
      roomId: chatType === 'hostel' && roomId ? roomId : (dmRoomId || ''),
      content: input,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    // Log event
    if (chatType === 'hostel') {
      console.log(`[Chat] ${currentUserId} sent GROUP message to room ${roomId}: ${input}`);
    } else {
      console.log(`[Chat] ${currentUserId} sent message to ${targetUserId}: ${input}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="font-semibold">
            {chatType === 'hostel' ? 'Group Chat' : `Chat with ${targetUser ? targetUser.name : 'User'}`}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-black">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2" style={{ minHeight: 300, maxHeight: 400 }}>
          {messages.map(msg => {
            const sender = mockUsers.find(u => u.id === msg.senderId);
            const isMe = msg.senderId === currentUserId;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-3 py-2 text-sm ${isMe ? 'bg-blue-100 text-right' : 'bg-gray-100'}`}
                  title={new Date(msg.timestamp).toLocaleString()}>
                  <div className="font-bold mb-1">{sender ? sender.name : 'User'}</div>
                  <div>{msg.content}</div>
                  <div className="text-xs text-gray-400 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>
        <div className="flex items-center border-t px-4 py-2">
          <input
            className="flex-1 border rounded px-2 py-1 mr-2"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            placeholder="Type a message..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
            onClick={handleSend}
            disabled={!input.trim()}
          >Send</button>
        </div>
      </div>
    </div>
  );
}; 