
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Docs: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16">
        <div className="container max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">ViralWarp Documentation</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What is ViralWarp?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                ViralWarp is an incentivized engagement platform for Farcaster that helps users grow their presence through 
                paid engagements. It's a marketplace where users can request and provide social interactions.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How ViralWarp Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Follow Trains 🚂</h3>
                  <p className="text-muted-foreground">
                    Users can pay to join follow trains, where multiple Farcaster users will follow them to boost their follower count. 
                    Set your budget, and get connected with real users willing to follow your profile.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Recast Boosts 🔄</h3>
                  <p className="text-muted-foreground">
                    Want more eyes on your cast? Pay users to recast your content to their followers. 
                    Set a price per recast and watch your reach expand.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Like Campaigns ❤️</h3>
                  <p className="text-muted-foreground">
                    Increase the like count on your casts by creating like campaigns. 
                    Users will engage with your content for the specified incentive.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Comment Interactions 💬</h3>
                  <p className="text-muted-foreground">
                    Start conversations on your casts by paying for quality comments. 
                    Specify the type of comments you want to receive.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Creating Your First Request</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                <li>Sign in with your Farcaster account</li>
                <li>Navigate to "Create Request" page</li>
                <li>Select the type of engagement you want (follows, recasts, likes, or comments)</li>
                <li>Set your budget and engagement requirements</li>
                <li>Submit your request and fund it using your Farcaster wallet</li>
                <li>Monitor engagement results in your dashboard</li>
              </ol>
              <p className="mt-4 text-muted-foreground">
                Note: ViralWarp charges a 10% processing fee on all payments and withdrawals to maintain the platform.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Earning with ViralWarp</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                You can also earn by fulfilling other users' engagement requests:
              </p>
              <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                <li>Browse available requests in the marketplace</li>
                <li>Fulfill engagement requirements by following, recasting, liking, or commenting</li>
                <li>Get paid directly to your Farcaster wallet once your engagement is verified</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Docs;
