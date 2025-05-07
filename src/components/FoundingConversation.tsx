import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MoreHorizontal, MessageSquare, Share } from "lucide-react";

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
    <div className="rounded-lg overflow-hidden shadow-lg border border-border bg-[#121212] text-white p-0 w-full max-w-sm mx-auto">
      {/* Phone status bar */}
      <div className="bg-[#121212] py-2 px-4 flex justify-between items-center text-xs text-gray-400">
        <div>2:08</div>
        <div className="flex items-center gap-1">
          <span>44%</span>
        </div>
      </div>
      
      {/* Chat header */}
      <div className="bg-[#121212] p-3 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-xl font-medium">Conversation</span>
        </div>
        <MoreHorizontal className="h-5 w-5" />
      </div>
      
      {/* Messages container */}
      <div className="flex flex-col space-y-6 p-4 h-[500px] overflow-y-auto bg-[#121212]">
        {messages.map((message) => {
          const isOwner = message.user === "508";
          return (
            <div key={message.id} className={`transition-all duration-500 ${
              message.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <a 
                href={message.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10 border-2 border-gray-700">
                    <AvatarImage src={message.avatar} alt={message.user} />
                    <AvatarFallback>{message.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{message.user}</span>
                      <span className="text-gray-500 text-xs">{message.time}</span>
                      <MoreHorizontal className="h-4 w-4 text-gray-500 ml-auto" />
                    </div>
                    
                    <div className="text-white/90 mb-2">
                      <p>{message.content}</p>
                    </div>
                    
                    <div className="flex items-center gap-6 text-gray-500">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-xs">1</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 4L4 8L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 8H14.5C17.5376 8 20 10.4624 20 13.5V13.5C20 16.5376 17.5376 19 14.5 19H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill={message.id === 2 ? "#E11D48" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {message.id === 2 && <span className="text-xs">2</span>}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              
              {message.id === messages.length && (
                <div className="text-xs text-gray-500 mt-2 ml-14">3:32 AM · 5/5/25 · Sent from warpcast</div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Bottom reply box */}
      <div className="p-4 border-t border-gray-800 bg-[#121212]">
        <div className="bg-gray-800 rounded-full px-4 py-3 text-gray-400">
          Reply to @dwr.eth
        </div>
      </div>
      
      {/* Bottom navigation */}
      <div className="flex justify-between items-center px-8 py-4 border-t border-gray-800 bg-[#121212]">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="14" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 11V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 11V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 9V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <div className="text-center py-2 text-primary/80 font-semibold border-t border-gray-800 text-sm">
        This conversation sparked the creation of ViralWarp
      </div>
    </div>
  );
};

export default FoundingConversation;
