import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Users, Share2, Heart, MessageSquare } from 'lucide-react';
import { useFarcaster } from '@/components/FarcasterProvider';
import { createRequest } from '@/services/requestsService';
import { useToast } from '@/hooks/use-toast';
import CastButton from '@/components/CastButton';

const CreateRequest = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, login } = useFarcaster();
  const { toast } = useToast();
  
  const [requestType, setRequestType] = useState<"follow" | "recast" | "like" | "comment">("follow");
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [castUrl, setCastUrl] = useState<string>('');
  const [target, setTarget] = useState<string>('10');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestCreated, setRequestCreated] = useState(false);
  const [requestId, setRequestId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication required",
        description: "Please connect your Farcaster account to create a request",
        variant: "destructive",
      });
      return;
    }
    
    if (!price || parseFloat(price) <= 0) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid price greater than 0",
        variant: "destructive",
      });
      return;
    }
    
    if (requestType !== "follow" && !castUrl) {
      toast({
        title: "Cast URL required",
        description: `Please provide a cast URL for the ${requestType} request`,
        variant: "destructive",
      });
      return;
    }
    
    if (!target || parseInt(target) <= 0) {
      toast({
        title: "Invalid target",
        description: "Please enter a valid target number of engagements",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format price with dollar sign if not present
      const formattedPrice = price.startsWith('$') ? price : `$${price}`;
      
      const newRequest = createRequest(
        requestType,
        formattedPrice,
        description,
        requestType !== "follow" ? castUrl : undefined,
        user.fid,
        user.username,
        parseInt(target)
      );
      
      setRequestId(newRequest.id);
      setRequestCreated(true);
      
      toast({
        title: "Request created",
        description: "Your engagement request has been created successfully"
      });
      
      // Navigate after a short delay
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (error) {
      console.error("Error creating request:", error);
      toast({
        title: "Request failed",
        description: "There was an error creating your request",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConnect = async () => {
    await login();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Create Engagement Request</h1>
            <p className="text-muted-foreground">Choose what type of engagement you want and set your price</p>
          </div>

          {!isAuthenticated && (
            <Card className="mb-6 border-warp-purple/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Connect your Farcaster account</h3>
                    <p className="text-muted-foreground mt-1">
                      You need to connect your account to create requests
                    </p>
                  </div>
                  <Button onClick={handleConnect}>Connect</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {requestCreated && requestId ? (
            <Card className="mb-6 border-green-500/30 bg-green-500/5">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-medium text-green-500">Request Created Successfully!</h3>
                  <p className="text-muted-foreground">
                    Your request has been created and is now available for others to engage with.
                  </p>
                  <div className="flex justify-center gap-4 mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/request/${requestId}`)}
                    >
                      View Request
                    </Button>
                    <CastButton 
                      url={`${window.location.origin}/request/${requestId}`}
                      message={`I just created a new ${requestType} request on ViralWarp! Join the engagement:`}
                      variant="default"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
                <CardDescription>
                  Fill out the form below to create your engagement request.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-base">Request Type</Label>
                      <RadioGroup 
                        value={requestType} 
                        onValueChange={(value) => setRequestType(value as "follow" | "recast" | "like" | "comment")}
                        className="grid grid-cols-2 gap-4 mt-2"
                      >
                        <Label
                          htmlFor="follow"
                          className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground ${
                            requestType === 'follow' ? 'border-warp-purple bg-warp-purple/10' : 'border-muted'
                          }`}
                        >
                          <RadioGroupItem value="follow" id="follow" className="sr-only" />
                          <Users className="mb-3 h-6 w-6" />
                          <span className="font-medium">Follow</span>
                        </Label>
                        <Label
                          htmlFor="recast"
                          className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground ${
                            requestType === 'recast' ? 'border-warp-purple bg-warp-purple/10' : 'border-muted'
                          }`}
                        >
                          <RadioGroupItem value="recast" id="recast" className="sr-only" />
                          <Share2 className="mb-3 h-6 w-6" />
                          <span className="font-medium">Recast</span>
                        </Label>
                        <Label
                          htmlFor="like"
                          className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground ${
                            requestType === 'like' ? 'border-warp-purple bg-warp-purple/10' : 'border-muted'
                          }`}
                        >
                          <RadioGroupItem value="like" id="like" className="sr-only" />
                          <Heart className="mb-3 h-6 w-6" />
                          <span className="font-medium">Like</span>
                        </Label>
                        <Label
                          htmlFor="comment"
                          className={`flex flex-col items-center justify-center rounded-md border-2 p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground ${
                            requestType === 'comment' ? 'border-warp-purple bg-warp-purple/10' : 'border-muted'
                          }`}
                        >
                          <RadioGroupItem value="comment" id="comment" className="sr-only" />
                          <MessageSquare className="mb-3 h-6 w-6" />
                          <span className="font-medium">Comment</span>
                        </Label>
                      </RadioGroup>
                    </div>
    
                    {requestType !== 'follow' && (
                      <div className="space-y-2">
                        <Label htmlFor="castUrl">Cast URL</Label>
                        <Input
                          id="castUrl"
                          placeholder="https://warpcast.com/username/0x123..."
                          value={castUrl}
                          onChange={(e) => setCastUrl(e.target.value)}
                          required
                        />
                        <p className="text-sm text-muted-foreground">
                          Paste the URL of the cast you want engagement on
                        </p>
                      </div>
                    )}
    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price per Engagement ($USD)</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0.01"
                          placeholder="0.00"
                          className="pl-7"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                      </div>
                    </div>
    
                    <div className="space-y-2">
                      <Label htmlFor="target">Target Number of Engagements</Label>
                      <Input
                        id="target"
                        type="number"
                        min="1"
                        placeholder="10"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        required
                      />
                      <p className="text-sm text-muted-foreground">
                        How many total engagements do you want?
                      </p>
                    </div>
    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Explain why people should engage with your content..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate("/dashboard")}>Cancel</Button>
                <Button 
                  className="bg-gradient-warp hover:opacity-90" 
                  onClick={handleSubmit}
                  disabled={!isAuthenticated || isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Request"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateRequest;
