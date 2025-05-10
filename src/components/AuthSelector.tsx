
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FarcasterAuth } from './FarcasterAuth';
import CivicLogin from './CivicLogin';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

const AuthSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("farcaster");
  const [showDevAlert, setShowDevAlert] = useState<boolean>(
    !(window.farcaster || window.parent !== window)
  );
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        {showDevAlert && (
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Development Mode</AlertTitle>
            <AlertDescription>
              You are running in development mode outside of a Farcaster client. 
              Some authentication features might not work properly. Use a Farcaster 
              client like Warpcast for the full experience.
            </AlertDescription>
          </Alert>
        )}
        
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
