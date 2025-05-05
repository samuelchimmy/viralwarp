
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Users, Share2, Heart, MessageSquare } from 'lucide-react';

const CreateRequest = () => {
  const [requestType, setRequestType] = useState<string>('follow');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [castUrl, setCastUrl] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would handle the submission logic
    console.log({ requestType, price, description, castUrl });
    alert("Request created successfully! (This is a demo)");
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
                      onValueChange={setRequestType}
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
              <Button variant="outline">Cancel</Button>
              <Button className="bg-gradient-warp hover:opacity-90" onClick={handleSubmit}>
                Create Request
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateRequest;
