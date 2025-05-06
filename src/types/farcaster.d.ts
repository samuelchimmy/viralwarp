
interface FarcasterResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface FarcasterUser {
  fid: number;
  username: string;
  displayName?: string;
  pfpUrl?: string;
  bio?: string;
  connectedAddress?: string;
}

interface CastOptions {
  text: string;
  embeds?: { url: string }[];
  mentions?: number[];
  parentCastId?: { fid: number; hash: string };
}

interface UserDetailOptions {
  username: string;
}

interface FarcasterClient {
  loginUser: () => Promise<FarcasterResponse<FarcasterUser>>;
  postCast: (options: CastOptions) => Promise<FarcasterResponse<{ hash: string }>>;
  fetchUserDetail?: (options: UserDetailOptions) => Promise<FarcasterResponse<FarcasterUser>>;
}

declare global {
  interface Window {
    farcaster?: FarcasterClient;
  }
}

export {};
