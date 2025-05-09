
import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { config } from './lib/wagmi-config';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={config}>
    <App />
  </WagmiProvider>
);
