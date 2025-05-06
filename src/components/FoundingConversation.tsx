
import React, { useState, useEffect } from 'react';

interface Message {
  id: number;
  user: string;
  avatar: string;
  content: string;
  time: string;
  visible: boolean;
  link: string;
}

const FoundingConversation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "508",
      avatar: "/lovable-uploads/dd9b5d50-7c1c-45aa-87a3-af296cc7fa5f.png",
      content: "Dwr. Am I shadowbanned? Where can I learn about farcaster visibility algorithm? I seem to be the only one reading my casts. It would be nice if the team can work on an algorithm that gives new casters some visibility to grow audience if they are consistent.",
      time: "22h",
      visible: false,
      link: "https://warpcast.com/508/0xb47bef10"
    },
    {
      id: 2,
      user: "dwr.eth",
      avatar: "https://i.imgur.com/XqA1PDt.png",
      content: "You're not shadow banned. You have 33 followers. Not many people are going to see your casts unfortunately.",
      time: "22h",
      visible: false,
      link: "https://warpcast.com/dwr.eth/0x57f79662"
    },
    {
      id: 3,
      user: "508",
      avatar: "/lovable-uploads/dd9b5d50-7c1c-45aa-87a3-af296cc7fa5f.png",
      content: "How do I grow my followers. Can I get a viral moment?",
      time: "22h",
      visible: false,
      link: "https://warpcast.com/508/0x46ba26a9"
    },
    {
      id: 4,
      user: "dwr.eth",
      avatar: "https://i.imgur.com/XqA1PDt.png",
      content: "Consistency and engagement with others is the best way to grow followers.",
      time: "20h",
      visible: false,
      link: "https://warpcast.com/dwr.eth/0xf9582cd5"
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
      }, 800 * (index + 1));
    });
  }, []);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-border bg-card p-4 w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-card-foreground/90">The Conversation That Started It All</h3>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      
      <div className="flex flex-row overflow-x-auto gap-4 pb-4 hide-scrollbar">
        {messages.map((message) => (
          <a 
            href={message.link}
            target="_blank"
            rel="noopener noreferrer"
            key={message.id}
            className={`flex-shrink-0 w-72 transform transition-all duration-700 ${
              message.visible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-10 opacity-0'
            } border border-border rounded-lg p-3 bg-card/50 hover:bg-card/80 transition-colors`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img src={message.avatar} alt={message.user} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">{message.user}</span>
                  <span className="text-muted-foreground text-sm">{message.time}</span>
                </div>
                <p className="text-card-foreground/90 mt-1 text-sm">{message.content}</p>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <span className="mr-4 text-xs">💬 1</span>
                  <span className="mr-4 text-xs">🔄</span>
                  <span className="text-xs">❤️</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      
      <div className={`text-center mt-8 text-primary font-semibold transition-all duration-700 ${
        messages[3].visible ? 'opacity-100' : 'opacity-0'
      }`}>
        And that's how ViralWarp was born...
      </div>
    </div>
  );
};

export default FoundingConversation;
