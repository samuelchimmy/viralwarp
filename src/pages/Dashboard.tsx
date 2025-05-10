import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFarcaster } from '@/components/FarcasterProvider';
import { useCivicAuth } from '@/components/CivicAuthProvider';
import UserProfile from '@/components/UserProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ActiveRequestsPreview from '@/components/ActiveRequestsPreview';

const Dashboard: React.FC = () => {
  const { isAuthenticated: isFarcasterAuthenticated, user: farcasterUser } = useFarcaster();
  const { user: civicUser } = useCivicAuth();
  const [activeTab, setActiveTab] = useState<string>("requests");

  const isAuthenticated = isFarcasterAuthenticated || civicUser?.isAuthenticated;
  
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-12">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>Please sign in to access your dashboard</CardDescription>
            </CardHeader>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your requests and profile
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-2 mb-8">
            <TabsTrigger value="requests">My Requests</TabsTrigger>
            <TabsTrigger value="profile">Profile & Wallet</TabsTrigger>
          </TabsList>
          
          <TabsContent value="requests">
            <ActiveRequestsPreview />
          </TabsContent>
          
          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
