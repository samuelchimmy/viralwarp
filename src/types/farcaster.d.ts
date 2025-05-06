
interface FarcasterUserData {
  fid: number;
  username: string;
  displayName?: string;
  pfpUrl?: string;
  bio?: string;
  verifications?: string[];
}

interface FarcasterAuthResponse {
  success: boolean;
  data?: FarcasterUserData;
  error?: string;
}

interface FarcasterWalletTxOptions {
  recipient: string;
  amount: number;
  memo?: string;
}

interface FarcasterWallet {
  sendTransaction: (options: FarcasterWalletTxOptions) => Promise<{
    success: boolean;
    data?: {
      txId: string;
      amount: number;
      recipient: string;
    };
    error?: string;
  }>;
  ethProvider: any; // EIP-1193 provider
}

interface FarcasterCastResponse {
  success: boolean;
  data?: {
    hash: string;
    threadHash?: string;
    author: {
      fid: number;
      username: string;
      displayName?: string;
    };
    text: string;
    timestamp: number;
    reactions: {
      likes: number;
      recasts: number;
    };
  }[];
  error?: string;
}

interface FarcasterCastQueryOptions {
  fid?: number;
  username?: string;
  parent?: string;
  limit?: number;
  cursor?: string;
}

interface FarcasterUserDetailOptions {
  fid?: number;
  username?: string;
}

interface FarcasterClientReactionOptions {
  target: string;
  type: "like" | "recast";
}

interface FarcasterClient {
  loginUser: () => Promise<FarcasterAuthResponse>;
  fetchUserDetail: (options: FarcasterUserDetailOptions) => Promise<{
    success: boolean;
    data?: FarcasterUserData & {
      following: number;
      followers: number;
      isFollowing?: boolean;
      isFollowedBy?: boolean;
    };
    error?: string;
  }>;
  fetchCasts: (options: FarcasterCastQueryOptions) => Promise<FarcasterCastResponse>;
  publishCast: (text: string, parent?: string) => Promise<{
    success: boolean;
    data?: {
      hash: string;
    };
    error?: string;
  }>;
  followUser: (fid: number) => Promise<{
    success: boolean;
    error?: string;
  }>;
  unfollowUser: (fid: number) => Promise<{
    success: boolean;
    error?: string;
  }>;
  reactToCast: (options: FarcasterClientReactionOptions) => Promise<{
    success: boolean;
    error?: string;
  }>;
  wallet: FarcasterWallet;
}

// Farcaster Frame SDK types
interface FrameSDK {
  actions: {
    ready: (options?: { disableNativeGestures?: boolean }) => Promise<void>;
    close: () => Promise<void>;
    openUrl: (url: string) => Promise<void>;
    addFrame: () => Promise<void>;
    viewProfile: (options: { fid: number }) => Promise<void>;
    signIn: () => Promise<any>;
  };
  wallet: {
    ethProvider: any; // EIP-1193 provider
  };
  context: {
    user: {
      fid: number;
      username?: string;
      displayName?: string;
      pfpUrl?: string;
    };
    location?: {
      type: 'cast_embed' | 'notification' | 'launcher' | 'channel';
      embed?: string;
      cast?: {
        fid: number;
        hash: string;
      };
      notification?: {
        notificationId: string;
        title: string;
        body: string;
      };
      channel?: {
        key: string;
        name: string;
        imageUrl?: string;
      };
    };
    client: {
      clientFid: number;
      added: boolean;
      safeAreaInsets?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
      notificationDetails?: {
        url: string;
        token: string;
      };
    };
  };
  experimental: {
    sendToken: (options: {
      token?: string;
      amount?: string;
      recipientAddress?: string;
      recipientFid?: number;
    }) => Promise<any>;
    viewToken: (options: { token: string }) => Promise<void>;
  };
}

interface Window {
  farcaster?: FarcasterClient;
  sdk?: FrameSDK;
}
