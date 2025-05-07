
import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, MessageSquare, Share } from "lucide-react";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "508",
      avatar: "/lovable-uploads/82df035c-894d-43c2-b969-e277a7e024ca.png",
      content: "Dwr. Am I shadowbanned? Where can I learn about farcaster visibility algorithm? I seem to be the only one reading my casts. It would be nice if the team can work on an algorithm that gives new casters some visibility to grow audience if they are consistent.",
      time: "22h",
      visible: false,
      link: "https://warpcast.com/508/0xb47bef10"
    },
    {
      id: 2,
      user: "dwr.eth",
      avatar: "/lovable-uploads/fc9012dd-f2e7-4036-98d9-8855850c45bb.png",
      content: "You're not shadow banned. You have 33 followers. Not many people are going to see your casts unfortunately.",
      time: "22h",
      visible: false,
      link: "https://warpcast.com/dwr.eth/0x57f79662"
    },
    {
      id: 3,
      user: "508",
      avatar: "/lovable-uploads/82df035c-894d-43c2-b969-e277a7e024ca.png",
      content: "How do I grow my followers. Can I get a viral moment?",
      time: "22h",
      visible: false,
      link: "https://warpcast.com/508/0x46ba26a9"
    },
    {
      id: 4,
      user: "dwr.eth",
      avatar: "/lovable-uploads/fc9012dd-f2e7-4036-98d9-8855850c45bb.png",
      content: "Reply to people and Make friends",
      time: "20h",
      visible: false,
      link: "https://warpcast.com/dwr.eth/0xf9582cd5"
    }
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Animate messages into view sequentially
    const timer = setTimeout(() => {
      setMessages(prevMessages => {
        return prevMessages.map((msg, idx) => ({
          ...msg,
          visible: idx <= currentIndex
        }));
      });
      
      if (currentIndex < messages.length - 1) {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    }, 700);
    
    return () => clearTimeout(timer);
  }, [currentIndex, messages.length]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full relative">
      {/* Navigation arrows */}
      <button 
        onClick={scrollLeft} 
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary/20 hover:bg-primary/30 p-2 rounded-full"
        aria-label="Scroll left"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      
      <button 
        onClick={scrollRight} 
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary/20 hover:bg-primary/30 p-2 rounded-full"
        aria-label="Scroll right"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
      
      {/* Timeline container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 py-6 px-12 hide-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {messages.map((message) => (
          <a 
            key={message.id} 
            href={message.link}
            target="_blank" 
            rel="noopener noreferrer"
            className={`snap-center flex-shrink-0 transition-all duration-700 transform ${
              message.visible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <Card className="w-[280px] p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage src={message.avatar} alt={message.user} />
                  <AvatarFallback>{message.user.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div>
                  <p className="font-semibold">{message.user}</p>
                  <p className="text-xs text-muted-foreground">{message.time}</p>
                </div>
              </div>
              
              <p className="text-sm mb-4">{message.content}</p>
              
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-xs">1</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill={message.id === 2 ? "#E11D48" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {message.id === 2 && <span className="text-xs">2</span>}
                </div>
                
                <div className="flex items-center gap-1 ml-auto">
                  <Share className="h-4 w-4" />
                </div>
              </div>
            </Card>
          </a>
        ))}
      </div>
      
      <div className="text-center py-2 text-primary/80 font-semibold text-sm mt-2">
        This conversation sparked the creation of ViralWarp
      </div>
    </div>
  );
};

export default FoundingConversation;
