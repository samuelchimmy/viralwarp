
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
      content: "Reply to people and Make friends",
      time: "20h",
      visible: false,
      link: "https://warpcast.com/dwr.eth/0xf9582cd5"
    }
  ]);

  useEffect(() => {
    // Make all messages visible immediately
    const timer = setTimeout(() => {
      setMessages(messages.map(msg => ({ ...msg, visible: true })));
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-border bg-card p-4 w-full max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-card-foreground/90">The Conversation That Started It All</h3>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      
      <div className="flex flex-col space-y-4 mb-4">
        {messages.map((message) => {
          const isOwner = message.user === "508";
          return (
            <a 
              href={message.link}
              target="_blank"
              rel="noopener noreferrer"
              key={message.id}
              className={`transition-all duration-500 ${
                message.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className={`flex ${isOwner ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[80%] ${isOwner ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src={message.avatar} alt={message.user} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  <div className={`mx-2 ${isOwner ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-foreground">{message.user}</span>
                      <span className="text-muted-foreground text-xs">{message.time}</span>
                    </div>
                    
                    <div className={`rounded-xl py-2 px-4 ${
                      isOwner 
                        ? 'bg-warp-purple/10 text-foreground rounded-tr-none' 
                        : 'bg-muted/50 text-foreground rounded-tl-none'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    
                    <div className="flex items-center mt-1 text-muted-foreground">
                      <span className="mr-4 text-xs">💬 1</span>
                      <span className="mr-4 text-xs">🔄</span>
                      <span className="text-xs">❤️</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
      
      <div className="text-center mt-8 text-primary font-semibold">
        And that's how ViralWarp was born...
      </div>
    </div>
  );
};

export default FoundingConversation;
