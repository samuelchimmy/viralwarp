
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCivicAuth } from './CivicAuthProvider';

const CivicLogin: React.FC = () => {
  const { loading, login } = useCivicAuth();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In with Civic</CardTitle>
        <CardDescription>
          Authentication has been temporarily disabled while we address stability issues.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4 items-center justify-center">
          <img 
            src="/lovable-uploads/2fcbbcf6-6ddd-427d-b46f-53b602fbf2d0.png" 
            alt="ViralWarp Logo" 
            className="w-24 h-24 mb-4"
          />
          <p className="text-sm text-muted-foreground text-center">
            Authentication has been temporarily disabled
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={login} 
          disabled={loading} 
          className="w-full"
        >
          Sign In (Disabled)
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CivicLogin;
