
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
              <CardTitle>The ViralWarp Origin Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                ViralWarp was born from a simple conversation on Farcaster. Our founder (@508) was struggling with visibility on the platform
                and reached out to Farcaster founder Dan Romero (dwr.eth) about the challenges new users face:
              </p>
              
              <div className="border-l-4 border-warp-purple pl-4 my-6 py-2">
                <p className="italic text-muted-foreground mb-2">
                  "Am I shadowbanned? Where can I learn about farcaster visibility algorithm? I seem to be the only one reading my casts. 
                  It would be nice if the team can work on an algorithm that gives new casters some visibility to grow audience if they are consistent."
                </p>
                <p className="text-sm text-right">- @508</p>
              </div>
              
              <p className="text-muted-foreground mb-4">
                The response was honest but highlighted a real problem:
              </p>
              
              <div className="border-l-4 border-warp-purple pl-4 my-6 py-2">
                <p className="italic text-muted-foreground mb-2">
                  "You're not shadow banned. You have 33 followers. Not many people are going to see your casts unfortunately."
                </p>
                <p className="text-sm text-right">- dwr.eth (Dan Romero)</p>
              </div>
              
              <p className="text-muted-foreground mb-4">
                This led to the fundamental question that sparked ViralWarp:
              </p>
              
              <div className="border-l-4 border-warp-purple pl-4 my-6 py-2">
                <p className="italic text-muted-foreground mb-2">
                  "How do I grow my followers? Can I get a viral moment?"
                </p>
                <p className="text-sm text-right">- @508</p>
              </div>
              
              <p className="text-muted-foreground">
                That's when the idea struck: what if we could create a platform where Farcaster users could help each other grow? 
                What if users with larger audiences could provide value to newer users, and be fairly compensated for their time and social capital?
                ViralWarp was created to solve this exact problem - democratizing visibility on Farcaster and creating win-win opportunities 
                for both established and emerging creators.
              </p>
            </CardContent>
          </Card>

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
                This fee goes to @508, the creator of ViralWarp.
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
