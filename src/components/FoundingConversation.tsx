
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface Message {
  id: number;
  user: string;
  avatar: string;
  content: string;
  time: string;
  visible: boolean;
}

const FoundingConversation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "508",
      avatar: "/lovable-uploads/dd9b5d50-7c1c-45aa-87a3-af296cc7fa5f.png",
      content: "Dwr. Am I shadowbanned? Where can I learn about farcaster visibility algorithm? I seem to be the only one reading my casts. It would be nice if the team can work on an algorithm that gives new casters some visibility to grow audience if they are consistent.",
      time: "22h",
      visible: false
    },
    {
      id: 2,
      user: "dwr.eth",
      avatar: "https://i.imgur.com/XqA1PDt.png",
      content: "You're not shadow banned. You have 33 followers. Not many people are going to see your casts unfortunately.",
      time: "22h",
      visible: false
    },
    {
      id: 3,
      user: "508",
      avatar: "/lovable-uploads/dd9b5d50-7c1c-45aa-87a3-af296cc7fa5f.png",
      content: "How do I grow my followers. Can I get a viral moment?",
      time: "22h",
      visible: false
    }
  ]);

  useEffect(() => {
    // Reveal messages one by one
    messages.forEach((message, index) => {
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === message.id ? { ...msg, visible: true } : msg
          )
        );
      }, 1000 * (index + 1));
    });
  }, []);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-border bg-black text-white p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white/90">The Conversation That Started It All</h3>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      
      <div className="space-y-6">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`transform transition-all duration-700 ${
              message.visible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img src={message.avatar} alt={message.user} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{message.user}</span>
                  <span className="text-gray-400 text-sm">{message.time}</span>
                </div>
                <p className="text-white/90 mt-1">{message.content}</p>
                <div className="flex items-center mt-2 text-gray-400">
                  <span className="mr-4">💬 1</span>
                  <span className="mr-4">🔄</span>
                  <span>❤️</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className={`text-center mt-8 text-purple-400 font-semibold transition-all duration-700 ${
          messages[2].visible ? 'opacity-100' : 'opacity-0'
        }`}>
          And that's how ViralWarp was born...
        </div>
      </div>
    </div>
  );
};

export default FoundingConversation;
