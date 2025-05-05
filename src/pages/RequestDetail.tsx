
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users, Share2, Heart, MessageSquare, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock request data
const mockRequests = {
  "1": {
    id: 1,
    type: "follow",
    username: "alice.eth",
    price: "$2.00",
    description: "New to Farcaster! Looking for initial followers.",
    icon: <Users className="h-5 w-5" />,
    date: "2025-05-04",
    remaining: 18
  },
  "2": {
    id: 2,
    type: "recast",
    username: "bob.lens",
    price: "$3.50",
    description: "Please recast my announcement about the new NFT drop!",
    icon: <Share2 className="h-5 w-5" />,
    date: "2025-05-04",
    castUrl: "https://warpcast.com/bob.lens/0x123",
    remaining: 12
  },
  "3": {
    id: 3,
    type: "like",
    username: "carol.fc",
    price: "$1.00",
    description: "Need more likes on my research thread about L2s.",
    icon: <Heart className="h-5 w-5" />,
    date: "2025-05-03",
    castUrl: "https://warpcast.com/carol.fc/0x456",
    remaining: 25
  },
  "4": {
    id: 4,
    type: "comment",
    username: "dave.warp",
    price: "$5.00",
    description: "Looking for thoughtful comments on my latest proposal.",
    icon: <MessageSquare className="h-5 w-5" />,
    date: "2025-05-03",
    castUrl: "https://warpcast.com/dave.warp/0x789",
    remaining: 8
  }
};

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fulfilled, setFulfilled] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (id && mockRequests[id as keyof typeof mockRequests]) {
        setRequest(mockRequests[id as keyof typeof mockRequests]);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleFulfill = () => {
    // Simulate fulfilling the request
    setTimeout(() => {
      setFulfilled(true);
      toast({
        title: "Request fulfilled!",
        description: `You've earned ${request?.price} for this engagement.`,
      });
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12">
          <div className="container max-w-3xl">
            <div className="text-center py-16">
              <p>Loading request details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12">
          <div className="container max-w-3xl">
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">Request not found</p>
              <Button onClick={() => navigate("/browse")}>Browse Requests</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center gap-2"
            onClick={() => navigate("/browse")}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Browse
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-warp-purple/10 rounded-full">
                  {request.icon}
                </div>
                <CardTitle className="capitalize">{request.type} Request</CardTitle>
              </div>
              <CardDescription>
                Created by @{request.username} on {request.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{request.description}</p>
              </div>

              {request.castUrl && (
                <div>
                  <h3 className="font-medium mb-2">Cast URL</h3>
                  <a 
                    href={request.castUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-warp-purple hover:underline break-all"
                  >
                    {request.castUrl}
                  </a>
                </div>
              )}

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Reward</p>
                  <p className="text-xl font-bold text-warp-purple">{request.price}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-xl font-bold">{request.remaining}</p>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-medium mb-2">How to fulfill this request</h3>
                {request.type === "follow" ? (
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Go to @{request.username}'s profile on Farcaster</li>
                    <li>Click the "Follow" button</li>
                    <li>Return here and click "Confirm Fulfilled" below</li>
                    <li>Our system will verify the action and process your payment</li>
                  </ol>
                ) : request.type === "recast" ? (
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Visit the cast using the URL above</li>
                    <li>Recast the content</li>
                    <li>Return here and click "Confirm Fulfilled" below</li>
                    <li>Our system will verify the recast and process your payment</li>
                  </ol>
                ) : request.type === "like" ? (
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Visit the cast using the URL above</li>
                    <li>Like the cast</li>
                    <li>Return here and click "Confirm Fulfilled" below</li>
                    <li>Our system will verify the like and process your payment</li>
                  </ol>
                ) : (
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Visit the cast using the URL above</li>
                    <li>Add a thoughtful comment to the cast</li>
                    <li>Return here and click "Confirm Fulfilled" below</li>
                    <li>Our system will verify your comment and process your payment</li>
                  </ol>
                )}
              </div>
            </CardContent>
            <CardFooter>
              {fulfilled ? (
                <div className="w-full flex flex-col items-center gap-3 py-2">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Request Fulfilled!</span>
                  </div>
                  <p className="text-muted-foreground">Payment has been added to your account</p>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                  >
                    View in Dashboard
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full bg-gradient-warp hover:opacity-90 py-6"
                  onClick={handleFulfill}
                >
                  Confirm Fulfilled
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestDetail;
