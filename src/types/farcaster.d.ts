
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

interface FarcasterWallet {
  sendTransaction: (options: any) => Promise<any>;
}

interface FarcasterClient {
  loginUser: () => Promise<FarcasterAuthResponse>;
  fetchUserDetail: (fid: number) => Promise<any>;
  fetchCasts: (options: any) => Promise<any>;
  wallet: FarcasterWallet;
}

interface Window {
  farcaster?: FarcasterClient;
}
