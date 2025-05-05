
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Users, Share2, Heart, MessageSquare, Search } from "lucide-react";

// Mock data for requests
const mockRequests = [
  {
    id: 1,
    type: "follow",
    username: "alice.eth",
    price: "$2.00",
    description: "New to Farcaster! Looking for initial followers.",
    icon: <Users className="h-5 w-5" />,
    date: "2025-05-04"
  },
  {
    id: 2,
    type: "recast",
    username: "bob.lens",
    price: "$3.50",
    description: "Please recast my announcement about the new NFT drop!",
    icon: <Share2 className="h-5 w-5" />,
    date: "2025-05-04"
  },
  {
    id: 3,
    type: "like",
    username: "carol.fc",
    price: "$1.00",
    description: "Need more likes on my research thread about L2s.",
    icon: <Heart className="h-5 w-5" />,
    date: "2025-05-03"
  },
  {
    id: 4,
    type: "comment",
    username: "dave.warp",
    price: "$5.00",
    description: "Looking for thoughtful comments on my latest proposal.",
    icon: <MessageSquare className="h-5 w-5" />,
    date: "2025-05-03"
  },
  {
    id: 5,
    type: "follow",
    username: "emma.cast",
    price: "$2.50",
    description: "Tech writer looking to grow audience for my AI research.",
    icon: <Users className="h-5 w-5" />,
    date: "2025-05-02"
  },
  {
    id: 6,
    type: "recast",
    username: "frank.fc",
    price: "$4.00",
    description: "Help promote my new Farcaster client app release!",
    icon: <Share2 className="h-5 w-5" />,
    date: "2025-05-02"
  },
  {
    id: 7,
    type: "like",
    username: "grace.eth",
    price: "$1.25",
    description: "Need engagement on my DeFi analysis thread.",
    icon: <Heart className="h-5 w-5" />,
    date: "2025-05-02"
  },
  {
    id: 8,
    type: "comment",
    username: "henry.lens",
    price: "$3.75",
    description: "Looking for feedback on my new protocol design.",
    icon: <MessageSquare className="h-5 w-5" />,
    date: "2025-05-01"
  },
];

const BrowseRequests = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  // Filter and sort the requests
  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || request.type === filterType;
    return matchesSearch && matchesType;
  }).sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOption === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortOption === "highest") {
      return parseFloat(b.price.substring(1)) - parseFloat(a.price.substring(1));
    } else if (sortOption === "lowest") {
      return parseFloat(a.price.substring(1)) - parseFloat(b.price.substring(1));
    }
    return 0;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Requests</h1>
            <p className="text-muted-foreground">Find engagement opportunities and earn rewards</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by username or description"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="follow">Follow</SelectItem>
                  <SelectItem value="recast">Recast</SelectItem>
                  <SelectItem value="like">Like</SelectItem>
                  <SelectItem value="comment">Comment</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest">Highest Price</SelectItem>
                  <SelectItem value="lowest">Lowest Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No matching requests found</p>
              <Button onClick={() => navigate("/create")}>Create a Request</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((request) => (
                <div key={request.id} className="warp-card p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-warp-purple/10 rounded-full">
                        {request.icon}
                      </div>
                      <span className="font-medium capitalize">{request.type}</span>
                    </div>
                    <span className="text-warp-purple font-bold">{request.price}</span>
                  </div>
                  <div className="mb-4 flex-grow">
                    <p className="font-semibold mb-1">@{request.username}</p>
                    <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                    <p className="text-xs text-muted-foreground">Posted: {request.date}</p>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/request/${request.id}`)}
                  >
                    Fulfill Request
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrowseRequests;
