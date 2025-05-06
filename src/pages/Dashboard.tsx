
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Share2, Heart, MessageSquare, DollarSign } from "lucide-react";

// Mock data with string icon names
const createdRequests = [
  {
    id: 1,
    type: "follow",
    completed: 12,
    target: 20,
    price: "$2.00",
    total: "$40.00",
    icon: "Users",
    date: "2025-05-02",
    status: "active"
  },
  {
    id: 2,
    type: "recast",
    completed: 8,
    target: 10,
    price: "$3.50",
    total: "$35.00",
    icon: "Share2",
    date: "2025-05-01",
    status: "active"
  },
  {
    id: 3,
    type: "like",
    completed: 25,
    target: 25,
    price: "$1.00",
    total: "$25.00",
    icon: "Heart",
    date: "2025-04-28",
    status: "completed"
  }
];

const fulfilledRequests = [
  {
    id: 101,
    type: "follow",
    username: "emma.cast",
    price: "$2.50",
    date: "2025-05-03",
    status: "paid",
    icon: "Users"
  },
  {
    id: 102,
    type: "recast",
    username: "frank.fc",
    price: "$4.00",
    date: "2025-05-02",
    status: "paid",
    icon: "Share2"
  },
  {
    id: 103,
    type: "comment",
    username: "dave.warp",
    price: "$5.00",
    date: "2025-05-01",
    status: "paid",
    icon: "MessageSquare"
  }
];

// Function to render icon based on icon name
const renderIcon = (iconName: string) => {
  switch (iconName) {
    case "Users":
      return <Users className="h-5 w-5" />;
    case "Share2":
      return <Share2 className="h-5 w-5" />;
    case "Heart":
      return <Heart className="h-5 w-5" />;
    case "MessageSquare":
      return <MessageSquare className="h-5 w-5" />;
    default:
      return <Users className="h-5 w-5" />;
  }
};

// Summary data
const summaryData = {
  balance: "$25.50",
  totalEarned: "$11.50",
  totalSpent: "$100.00",
  activeRequests: 2
};

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
            <p className="text-muted-foreground">Track your requests and earnings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Current Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="mr-2 text-warp-purple" />
                  <span className="text-2xl font-bold">{summaryData.balance}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Earned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="mr-2 text-green-500" />
                  <span className="text-2xl font-bold">{summaryData.totalEarned}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Spent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="mr-2 text-blue-500" />
                  <span className="text-2xl font-bold">{summaryData.totalSpent}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Share2 className="mr-2 text-warp-purple" />
                  <span className="text-2xl font-bold">{summaryData.activeRequests}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="created" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="created">Requests You Created</TabsTrigger>
              <TabsTrigger value="fulfilled">Requests You Fulfilled</TabsTrigger>
            </TabsList>
            <TabsContent value="created">
              <div className="space-y-6">
                {createdRequests.map((request) => (
                  <Card key={request.id} className={request.status === "completed" ? "bg-muted/30" : ""}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-warp-purple/10 rounded-full">
                            {renderIcon(request.icon)}
                          </div>
                          <div>
                            <p className="font-semibold capitalize">{request.type} Request</p>
                            <p className="text-sm text-muted-foreground">Created: {request.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="text-center px-3">
                            <p className="text-muted-foreground">Price</p>
                            <p className="font-bold">{request.price}</p>
                          </div>
                          <div className="text-center px-3 border-x border-border">
                            <p className="text-muted-foreground">Progress</p>
                            <p className="font-bold">{request.completed}/{request.target}</p>
                          </div>
                          <div className="text-center px-3">
                            <p className="text-muted-foreground">Total</p>
                            <p className="font-bold">{request.total}</p>
                          </div>
                        </div>
                        <div>
                          {request.status === "active" ? (
                            <Button variant="outline" className="border-warp-purple text-warp-purple">
                              Manage
                            </Button>
                          ) : (
                            <Button variant="outline" disabled>
                              Completed
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="fulfilled">
              <div className="space-y-6">
                {fulfilledRequests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-warp-purple/10 rounded-full">
                            {renderIcon(request.icon)}
                          </div>
                          <div>
                            <p className="font-semibold capitalize">@{request.username}'s {request.type} Request</p>
                            <p className="text-sm text-muted-foreground">Fulfilled: {request.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p>You earned: <span className="font-bold text-warp-purple">{request.price}</span></p>
                        </div>
                        <div>
                          <Button variant="outline" disabled>
                            {request.status === "paid" ? "Paid" : "Pending"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center p-6">
            <Button 
              className="bg-gradient-warp hover:opacity-90"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Add Funds to Your Account
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
