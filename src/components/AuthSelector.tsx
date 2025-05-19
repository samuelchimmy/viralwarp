
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FarcasterAuth } from './FarcasterAuth';
import CivicLogin from './CivicLogin';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

const AuthSelector: React.FC = () => {
  // Always show dev alert for now
  const showDevAlert = true;
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        {showDevAlert && (
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Disabled</AlertTitle>
            <AlertDescription>
              Authentication functionality has been temporarily disabled
              while we address stability issues.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="civic">
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
