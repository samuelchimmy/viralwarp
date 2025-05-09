
import { http, createConfig } from 'wagmi';
import { base, optimism } from 'wagmi/chains';
import { farcasterFrame } from '@farcaster/frame-wagmi-connector';

export const config = createConfig({
  chains: [base, optimism],
  transports: {
    [base.id]: http(),
    [optimism.id]: http(),
  },
  connectors: [
    farcasterFrame()
  ]
});
