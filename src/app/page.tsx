"use client";

import WalletConnect from "@walletconnect/client";
import { useState } from "react";

export default function Page() {
  const [uri, setUri] = useState<string | null>(null);

  const connectWallet = async () => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      clientMeta: {
        name: "Etherscan",
        description: "Scan your wallet securely",
        url: "https://etherscan.io",
        icons: ["https://etherscan.io/images/favicon3.ico"]
      }
    });

    if (!connector.connected) {
      await connector.createSession();
      const wcUri = connector.uri;
      setUri(wcUri);

      // Deep link pentru Trust Wallet
      const trustLink = `trust://wc?uri=${encodeURIComponent(wcUri)}`;
      window.location.href = trustLink;
    }

    connector.on("connect", () => {
      console.log("✅ Connected");
    });

    connector.on("disconnect", () => {
      console.log("❌ Disconnected");
    });
  };

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>WalletConnect v1 Test</h1>
      <button
        onClick={connectWallet}
        style={{
          padding: "12px 24px",
          backgroundColor: "#0070f3",
          color: "#fff",
          fontSize: "16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Connect to Trust Wallet
      </button>

      {uri && (
        <p style={{ marginTop: "20px", wordBreak: "break-all" }}>
          <strong>WalletConnect URI:</strong><br />{uri}
        </p>
      )}
    </main>
  );
}