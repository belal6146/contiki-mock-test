import React, { useState, useEffect, useRef } from 'react';
import { mockUsers, mockMessages } from '@/data/mockChat';
import { MockUser, MockMessage, ChatType } from '@/types/chat';
import { Send } from 'lucide-react';

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

  // For group chat, get participants
  const groupParticipants = chatType === 'hostel' && roomId
    ? mockUsers.filter(u => true) // In real app, filter by room
    : [];

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

  useEffect(() => {
    // Add ESC and click outside to close modal
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains('contiki-chat-modal-bg')) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClick);
    };
  }, [onClose]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center contiki-chat-modal-bg bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col border-2 border-black">
        {/* Group chat welcome banner and participants */}
        {chatType === 'hostel' && (
          <>
            <div className="bg-[#CCFF00] rounded-t-2xl px-6 py-3 border-b-2 border-black flex flex-col items-center">
              <div className="font-bold text-black text-sm uppercase tracking-wide mb-1">Say hello before you go!</div>
              <div className="text-black text-xs font-medium text-center">Plan a meal with new friends, or gather a crew for a game of beach volleyball!</div>
            </div>
            <div className="flex items-center gap-2 px-6 py-2 border-b border-gray-200 bg-white">
              {groupParticipants.map(u => (
                <div key={u.id} className="w-8 h-8 rounded-full border-2 border-black bg-[#CCFF00] flex items-center justify-center font-bold text-black text-xs uppercase" title={u.name}>
                  {u.name.split(' ').map(n => n[0]).join('')}
                </div>
              ))}
            </div>
          </>
        )}
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="font-semibold text-black text-base uppercase font-montserrat">
            {chatType === 'hostel' ? 'Group Chat' : `Chat with ${targetUser ? targetUser.name : 'User'}`}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl font-bold">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4" style={{ minHeight: 300, maxHeight: 400 }}>
          {messages.map((msg, idx) => {
            const sender = mockUsers.find(u => u.id === msg.senderId);
            const isMe = msg.senderId === currentUserId;
            const showName = !isMe && (idx === 0 || messages[idx - 1].senderId !== msg.senderId);
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end`}>
                {/* Avatar for others */}
                {!isMe && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-black text-xs mr-2 uppercase overflow-hidden border border-gray-300">
                    {sender ? sender.name.split(' ').map(n => n[0]).join('') : '?'}
                  </div>
                )}
                <div>
                  {/* Sender name for others */}
                  {showName && !isMe && (
                    <div className="text-xs font-bold text-gray-700 mb-1 ml-1">{sender ? sender.name : 'User'}</div>
                  )}
                  <div className={`px-4 py-2 rounded-2xl shadow-sm ${isMe ? 'bg-[#CCFF00] text-white' : 'bg-white text-black'} max-w-[70vw] break-words font-montserrat`} style={{borderRadius: '20px'}}>
                    {msg.content}
                  </div>
                  <div className={`text-xs mt-1 ${isMe ? 'text-right text-gray-300' : 'text-left text-gray-400'} px-1`}>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>
        <div className="flex items-center border-t px-4 py-2 bg-white">
          <input
            className="flex-1 border-2 border-black rounded-full px-4 py-2 mr-2 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-[#CCFF00]"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            placeholder="Type a message..."
            autoFocus
          />
          <button
            className="bg-[#CCFF00] text-black px-4 py-2 rounded-full font-bold uppercase flex items-center gap-1 border-2 border-black hover:bg-black hover:text-[#CCFF00] transition-colors"
            onClick={handleSend}
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </div>
      </div>
    </div>
  );
}; 