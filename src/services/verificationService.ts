
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

// In a production app, this would be stored in Supabase
// For now, we'll use localStorage to persist between sessions
const getVerificationRequests = (): VerificationRequest[] => {
  try {
    const saved = localStorage.getItem("verification_requests");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading verification requests:", error);
    return [];
  }
};

const saveVerificationRequests = (requests: VerificationRequest[]): void => {
  try {
    localStorage.setItem("verification_requests", JSON.stringify(requests));
  } catch (error) {
    console.error("Error saving verification requests:", error);
  }
};

let verificationRequests = getVerificationRequests();
let nextVerificationId = verificationRequests.length > 0 
  ? Math.max(...verificationRequests.map(r => r.id)) + 1 
  : 1;

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
    saveVerificationRequests(verificationRequests);

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

// Function to verify follow action using Farcaster API
const verifyFollow = async (username: string, currentUserFid: number): Promise<boolean> => {
  try {
    if (!window.farcaster) {
      return false;
    }

    // Get target user details by username
    // Check if fetchUserDetail exists before trying to use it
    if (!window.farcaster.fetchUserDetail) {
      console.log("fetchUserDetail not available in Farcaster client");
      return false;
    }
    
    const targetUserDetails = await window.farcaster.fetchUserDetail({ username });
    if (!targetUserDetails?.data) {
      return false;
    }

    // In a real implementation, you would check if currentUserFid follows targetUserFid
    // For now we'll return true as the verification would happen server-side
    
    return true; // Admin will manually verify for now
  } catch (error) {
    console.error("Error verifying follow:", error);
    return false;
  }
};

// Function to verify cast engagement (like, recast, comment)
const verifyCastEngagement = async (
  castUrl: string,
  type: "like" | "recast" | "comment",
  currentUserFid: number
): Promise<boolean> => {
  try {
    if (!window.farcaster) {
      return false;
    }

    // Parse castUrl to get hash
    const urlObj = new URL(castUrl);
    const pathParts = urlObj.pathname.split('/');
    const castHash = pathParts[pathParts.length - 1];
    
    if (!castHash) {
      return false;
    }
    
    // In a real implementation, you would fetch the cast and check if the user has engaged with it
    // For now we'll return true as the verification would happen server-side or by admin
    
    return true; // Admin will manually verify for now
  } catch (error) {
    console.error(`Error verifying ${type}:`, error);
    return false;
  }
};

export const verifyEngagement = async (
  requestType: string,
  castUrl: string | undefined,
  username: string
): Promise<boolean> => {
  try {
    // In a real implementation, this would use the Farcaster API to verify
    // For this demo, we'll simulate verification with a user confirmation
    
    // This would be the real verification logic using Farcaster API
    // For now, we assume the verification was successful and will be checked by admin
    toast({
      title: "Verification request submitted",
      description: `Your ${requestType} action will be verified by an admin`,
    });
    
    return true;
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
  
  const requestIndex = verificationRequests.findIndex(req => req.id === verificationId);
  if (requestIndex === -1) {
    toast({
      title: "Request not found",
      description: "Verification request does not exist",
      variant: "destructive",
    });
    return false;
  }
  
  verificationRequests[requestIndex].status = approve ? "approved" : "rejected";
  saveVerificationRequests(verificationRequests);
  
  toast({
    title: `Request ${approve ? "approved" : "rejected"}`,
    description: `Verification for ${verificationRequests[requestIndex].username} has been ${approve ? "approved" : "rejected"}`,
  });
  
  return true;
};

export const getAdminVerificationRequests = (): VerificationRequest[] => {
  if (!isAdmin()) {
    return [];
  }
  
  return verificationRequests.filter(req => req.status === "pending");
};
