
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FarcasterAuth } from './FarcasterAuth';
import CivicLogin from './CivicLogin';

const AuthSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("farcaster");
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <Tabs defaultValue="farcaster" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="farcaster">Farcaster</TabsTrigger>
            <TabsTrigger value="civic">Civic</TabsTrigger>
          </TabsList>
          <TabsContent value="farcaster" className="mt-6">
            <FarcasterAuth />
          </TabsContent>
          <TabsContent value="civic" className="mt-6">
            <CivicLogin />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthSelector;
