
import { toast } from "@/hooks/use-toast";
import { isAdmin } from "./farcasterAuth";

interface VerificationRequest {
  id: number;
  requestId: number;
  userId: number;
  username: string;
  status: "pending" | "approved" | "rejected";
  timestamp: string;
  paymentStatus: "pending" | "paid";
}

// Mock data store - in production this would be in Supabase
const verificationRequests: VerificationRequest[] = [];
let nextVerificationId = 1;

export const submitVerification = async (requestId: number, userId: number, username: string): Promise<boolean> => {
  try {
    // Check if user has already submitted verification for this request
    const existingRequest = verificationRequests.find(
      req => req.requestId === requestId && req.userId === userId
    );

    if (existingRequest) {
      toast({
        title: "Already submitted",
        description: `Status: ${existingRequest.status}. Please wait for verification.`,
        variant: "destructive",
      });
      return false;
    }

    // Create new verification request
    const newRequest: VerificationRequest = {
      id: nextVerificationId++,
      requestId,
      userId,
      username,
      status: "pending",
      timestamp: new Date().toISOString(),
      paymentStatus: "pending",
    };

    verificationRequests.push(newRequest);

    toast({
      title: "Verification submitted",
      description: "Your request is pending admin verification",
    });
    
    return true;
  } catch (error) {
    console.error("Error submitting verification:", error);
    toast({
      title: "Submission error",
      description: "Failed to submit verification",
      variant: "destructive",
    });
    return false;
  }
};

export const checkVerificationStatus = (requestId: number, userId: number): "pending" | "approved" | "rejected" | "none" => {
  const request = verificationRequests.find(
    req => req.requestId === requestId && req.userId === userId
  );
  
  return request ? request.status : "none";
};

export const verifyEngagement = async (
  requestType: string,
  castUrl: string | undefined,
  username: string
): Promise<boolean> => {
  try {
    // In a real implementation, this would call the Farcaster API to verify
    // For this demo version, we'll simulate verification with a delay
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful verification 80% of the time
        const isVerified = Math.random() > 0.2;
        
        if (isVerified) {
          toast({
            title: "Verification successful",
            description: `${requestType} action was confirmed`,
          });
        } else {
          toast({
            title: "Verification failed",
            description: `Could not verify your ${requestType} action`,
            variant: "destructive",
          });
        }
        
        resolve(isVerified);
      }, 1500);
    });
  } catch (error) {
    console.error("Error verifying engagement:", error);
    toast({
      title: "Verification error",
      description: `Failed to verify your ${requestType}`,
      variant: "destructive",
    });
    return false;
  }
};

export const adminVerify = async (verificationId: number, approve: boolean): Promise<boolean> => {
  // Check if user is admin
  if (!isAdmin()) {
    toast({
      title: "Unauthorized",
      description: "Only admins can verify requests",
      variant: "destructive",
    });
    return false;
  }
  
  const request = verificationRequests.find(req => req.id === verificationId);
  if (!request) {
    toast({
      title: "Request not found",
      description: "Verification request does not exist",
      variant: "destructive",
    });
    return false;
  }
  
  request.status = approve ? "approved" : "rejected";
  
  toast({
    title: `Request ${approve ? "approved" : "rejected"}`,
    description: `Verification for ${request.username} has been ${approve ? "approved" : "rejected"}`,
  });
  
  return true;
};
