
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ActiveRequestsPreview from '@/components/ActiveRequestsPreview';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("requests");
  
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
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Profile Disabled</CardTitle>
                <CardDescription>User profile functionality has been temporarily disabled</CardDescription>
              </CardHeader>
              <CardContent>
                <p>User profile and wallet features are currently unavailable.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
