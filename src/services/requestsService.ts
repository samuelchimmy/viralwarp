
import { toast } from "@/hooks/use-toast";
import { Users, Share2, Heart, MessageSquare } from "lucide-react";
import React from "react";

export interface EngagementRequest {
  id: number;
  type: "follow" | "recast" | "like" | "comment";
  username: string;
  price: string;
  description: string;
  icon: string; // Changed from React.ReactNode to string
  date: string;
  castUrl?: string;
  remaining: number;
  creatorFid: number;
  completed?: number;
  target?: number;
  status?: "active" | "completed";
}

// In a production app, this would be stored in Supabase
// For now, we'll use localStorage to persist between sessions
const getStoredRequests = (): EngagementRequest[] => {
  try {
    const saved = localStorage.getItem("engagement_requests");
    if (!saved) return [];
    
    const parsed = JSON.parse(saved);
    
    // Add icons since they can't be stored in JSON
    return parsed.map((req: any) => ({
      ...req,
      icon: getIconForType(req.type)
    }));
  } catch (error) {
    console.error("Error loading engagement requests:", error);
    return [];
  }
};

const saveRequests = (requests: EngagementRequest[]): void => {
  try {
    // Remove icons before storing as they can't be serialized
    const stripped = requests.map(req => {
      const { icon, ...rest } = req;
      return rest;
    });
    
    localStorage.setItem("engagement_requests", JSON.stringify(stripped));
  } catch (error) {
    console.error("Error saving engagement requests:", error);
  }
};

// Function to get the appropriate icon name for each engagement type
const getIconForType = (type: string): string => {
  switch (type) {
    case "follow":
      return "Users";
    case "recast":
      return "Share2";
    case "like":
      return "Heart";
    case "comment":
      return "MessageSquare";
    default:
      return "Users";
  }
};

// Initialize with stored data or defaults
let requests = getStoredRequests();
let nextRequestId = requests.length > 0 
  ? Math.max(...requests.map(r => r.id)) + 1 
  : 1;

// Seed with initial data if empty
if (requests.length === 0) {
  requests = [
    {
      id: nextRequestId++,
      type: "follow",
      username: "508",
      price: "$2.00",
      description: "Looking for followers to grow my network!",
      icon: "Users",
      date: new Date().toISOString().split('T')[0],
      remaining: 20,
      creatorFid: 508,
      target: 20,
      completed: 0,
      status: "active"
    },
    {
      id: nextRequestId++,
      type: "recast",
      username: "508",
      price: "$3.50",
      description: "Please recast my announcement about EngageToEarn!",
      icon: "Share2",
      date: new Date().toISOString().split('T')[0],
      castUrl: "https://warpcast.com/508/0x123",
      remaining: 15,
      creatorFid: 508,
      target: 15,
      completed: 0,
      status: "active"
    },
    {
      id: nextRequestId++,
      type: "like",
      username: "508",
      price: "$1.00",
      description: "Need more likes on my latest thread about Farcaster!",
      icon: "Heart",
      date: new Date().toISOString().split('T')[0],
      castUrl: "https://warpcast.com/508/0x456",
      remaining: 25,
      creatorFid: 508,
      target: 25,
      completed: 0,
      status: "active"
    },
    {
      id: nextRequestId++,
      type: "comment",
      username: "508",
      price: "$5.00",
      description: "Looking for thoughtful comments on my latest proposal.",
      icon: "MessageSquare",
      date: new Date().toISOString().split('T')[0],
      castUrl: "https://warpcast.com/508/0x789",
      remaining: 10,
      creatorFid: 508,
      target: 10,
      completed: 0,
      status: "active"
    }
  ];
  
  saveRequests(requests);
}

export const getAllRequests = (): EngagementRequest[] => {
  return requests;
};

export const getRequestById = (id: number): EngagementRequest | undefined => {
  return requests.find(req => req.id === id);
};

export const getUserRequests = (creatorFid: number): EngagementRequest[] => {
  return requests.filter(req => req.creatorFid === creatorFid);
};

export const createRequest = (
  type: "follow" | "recast" | "like" | "comment",
  price: string,
  description: string,
  castUrl: string | undefined,
  creatorFid: number,
  username: string,
  target: number
): EngagementRequest => {
  const newRequest: EngagementRequest = {
    id: nextRequestId++,
    type,
    username,
    price,
    description,
    icon: getIconForType(type),
    date: new Date().toISOString().split('T')[0],
    castUrl,
    remaining: target,
    creatorFid,
    target,
    completed: 0,
    status: "active"
  };
  
  requests.push(newRequest);
  saveRequests(requests);
  
  toast({
    title: "Request created",
    description: `Your ${type} request has been created successfully`,
  });
  
  return newRequest;
};

export const updateRequestCompletion = (requestId: number): void => {
  const index = requests.findIndex(req => req.id === requestId);
  
  if (index !== -1) {
    const request = requests[index];
    
    if (request.completed === undefined) {
      request.completed = 0;
    }
    
    request.completed += 1;
    request.remaining -= 1;
    
    if (request.remaining <= 0) {
      request.status = "completed";
    }
    
    requests[index] = request;
    saveRequests(requests);
  }
};
