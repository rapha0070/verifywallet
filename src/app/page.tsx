'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  ConnectButton,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, polygon, arbitrum, optimism } from 'wagmi/chains';
import { useState } from 'react';

const config = getDefaultConfig({
  appName: 'Etherscan-like',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Replace with your WalletConnect Project ID
  chains: [mainnet, polygon, arbitrum, optimism],
  ssr: true,
});

const queryClient = new QueryClient();

export default function Page() {
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

  const handleVerify = () => {
    setToast({
      message: 'Verification process initiated. Please connect your wallet first.',
      type: 'info',
    });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                  <a href="#" className="text-2xl font-['Pacifico'] text-primary mr-8">logo</a>
                  <nav className="hidden md:flex space-x-6">
                    <a href="#" className="text-white hover:text-primary transition-colors">Home</a>
                    <a href="#" className="text-white hover:text-primary transition-colors">Verify</a>
                    <a href="#" className="text-white hover:text-primary transition-colors">Documentation</a>
                    <a href="#" className="text-white hover:text-primary transition-colors">Explorer</a>
                  </nav>
                </div>
                <ConnectButton showBalance={false} />
              </div>
            </header>
            {/* Hero Section */}
            <section className="relative hero-bg" style={{
              backgroundImage: "url('https://readdy.ai/api/search-image?query=modern%20blockchain%20technology%20visualization%20with%20dark%20blue%20background%2C%20abstract%20digital%20network%20connections%2C%20glowing%20nodes%20and%20lines%20representing%20blockchain%2C%20professional%20crypto%20theme%2C%20clean%20design%2C%20perfect%20for%20web3%20platform%2C%20high%20quality%20digital%20art&width=1920&height=800&seq=hero1&orientation=landscape')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}>
              <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
              <div className="container mx-auto px-4 py-24 relative z-10">
                <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Token Verification Platform
                  </h1>
                  <p className="text-xl text-gray-200 mb-8">
                    Ensure trust and security in the blockchain ecosystem by verifying your tokens. Our platform provides comprehensive verification services to protect investors and enhance market credibility.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-all whitespace-nowrap"
                      onClick={handleVerify}
                    >
                      Verify Token
                    </button>
                    <button
                      className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-medium transition-all whitespace-nowrap"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </section>
            {/* Token Verification Importance */}
            <section className="bg-white py-20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Why Token Verification Matters
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    In the rapidly evolving Web3 ecosystem, verification is the cornerstone of trust and legitimacy.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="bg-gray-50 p-8 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                      <div className="w-8 h-8 flex items-center justify-center text-primary">
                        {/* Replace with icon library if needed */}
                        <span className="text-2xl">🛡️</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Security & Trust
                    </h3>
                    <p className="text-gray-600">
                      Verification confirms that tokens operate as described in their documentation, with no hidden functions or backdoors that could compromise user funds.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                      <div className="w-8 h-8 flex items-center justify-center text-primary">
                        <span className="text-2xl">📈</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Market Credibility
                    </h3>
                    <p className="text-gray-600">
                      Verified tokens gain immediate credibility in the marketplace, making them more attractive to investors, exchanges, and partnership opportunities.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                      <div className="w-8 h-8 flex items-center justify-center text-primary">
                        <span className="text-2xl">🛡️</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Investor Protection
                    </h3>
                    <p className="text-gray-600">
                      Verification helps investors distinguish legitimate projects from scams, reducing the risk of fraud and protecting the community from malicious actors.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* Verification Process */}
            <section className="bg-gray-50 py-20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    The Verification Process
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our streamlined process makes token verification simple and efficient.
                  </p>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  {['Connect Wallet', 'Submit Token Details', 'Verify Contract', 'Receive Verification Badge'].map((step, i) => (
                    <div key={step} className="step-card bg-white p-8 rounded-lg shadow-sm flex-1 relative">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-6 font-bold">
                        {i + 1}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{step}</h3>
                      <p className="text-gray-600">
                        {[
                          'Connect your Web3 wallet to authenticate and begin the verification process securely.',
                          'Provide essential information about your token, including contract address and source code.',
                          'Our system analyzes the contract code to ensure it matches the compiled bytecode on the blockchain.',
                          'Upon successful verification, your token receives an official verification badge visible to all users.'
                        ][i]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            {/* Features Section */}
            <section className="bg-white py-20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Comprehensive Verification Features
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our platform offers a suite of tools to ensure complete token verification and transparency.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="feature-card bg-gray-50 p-6 rounded-lg shadow-sm transition-all duration-300">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <div className="w-7 h-7 flex items-center justify-center text-primary">
                        <span className="text-2xl">💻</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Smart Contract Verification
                    </h3>
                    <p className="text-gray-600">
                      Verify source code matches deployed bytecode for complete transparency.
                    </p>
                  </div>
                  <div className="feature-card bg-gray-50 p-6 rounded-lg shadow-sm transition-all duration-300">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <div className="w-7 h-7 flex items-center justify-center text-primary">
                        <span className="text-2xl">📊</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Token Analytics
                    </h3>
                    <p className="text-gray-600">
                      Access comprehensive data on token distribution, transactions, and market activity.
                    </p>
                  </div>
                  <div className="feature-card bg-gray-50 p-6 rounded-lg shadow-sm transition-all duration-300">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <div className="w-7 h-7 flex items-center justify-center text-primary">
                        <span className="text-2xl">🔍</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Security Audit
                    </h3>
                    <p className="text-gray-600">
                      Automated security scanning to identify potential vulnerabilities in token contracts.
                    </p>
                  </div>
                  <div className="feature-card bg-gray-50 p-6 rounded-lg shadow-sm transition-all duration-300">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <div className="w-7 h-7 flex items-center justify-center text-primary">
                        <span className="text-2xl">💹</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Market Status
                    </h3>
                    <p className="text-gray-600">
                      Real-time information on liquidity, trading volume, and market capitalization.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* Call-to-Action Section */}
            <section className="gradient-bg py-20 text-white" style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)"
            }}>
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Verify Your Token?</h2>
                <p className="text-xl mb-10 max-w-2xl mx-auto">
                  Join thousands of verified tokens in building trust and credibility in the blockchain ecosystem.
                </p>
                <button
                  className="bg-white hover:bg-gray-100 text-gray-900 px-10 py-4 rounded-lg font-medium text-lg transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
                  onClick={handleVerify}
                >
                  Start Verification Process
                </button>
                <div className="mt-16 flex flex-wrap justify-center gap-12">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">12,450+</div>
                    <div className="text-gray-200">Verified Tokens</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">98%</div>
                    <div className="text-gray-200">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">250K+</div>
                    <div className="text-gray-200">Active Users</div>
                  </div>
                </div>
              </div>
            </section>
            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                  <div>
                    <a href="#" className="text-2xl font-['Pacifico'] text-primary mb-4 inline-block">logo</a>
                    <p className="text-gray-400 mb-6">
                      The leading token verification platform for the Web3 ecosystem.
                    </p>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full">
                          <span className="text-xl">X</span>
                        </div>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full">
                          <span className="text-xl">✈️</span>
                        </div>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full">
                          <span className="text-xl">💬</span>
                        </div>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full">
                          <span className="text-xl">🐙</span>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Platform</h3>
                    <ul className="space-y-3">
                      <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Token Verification</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Explorer</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Analytics</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">API</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Resources</h3>
                    <ul className="space-y-3">
                      <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Documentation</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Tutorials</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">FAQs</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Support</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
                    <p className="text-gray-400 mb-4">
                      Stay updated with the latest in token verification and blockchain security.
                    </p>
                    <div className="flex">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="bg-gray-800 text-white px-4 py-2 rounded-l-lg w-full border-none focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg whitespace-nowrap"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                  <div className="text-gray-400 mb-4 md:mb-0">
                    <span>© 2025 Etherscan-like. All rights reserved.</span>
                  </div>
                  <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms</a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy</a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors">Cookies</a>
                  </div>
                  <div className="flex items-center mt-4 md:mt-0">
                    <span className="flex h-3 w-3 relative mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-gray-400">Network Status: Operational</span>
                  </div>
                </div>
              </div>
            </footer>
            {/* Toast Notification */}
            {toast && (
              <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 flex items-center z-50">
                <div className={`w-8 h-8 flex items-center justify-center mr-3 rounded-full
                  ${toast.type === 'info' ? 'bg-blue-100 text-blue-500' : toast.type === 'success' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                  {toast.type === 'info' && <span>ℹ️</span>}
                  {toast.type === 'success' && <span>✅</span>}
                  {toast.type === 'error' && <span>❌</span>}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{toast.type === 'success' ? 'Success!' : toast.type === 'error' ? 'Error!' : 'Info'}</div>
                  <div className="text-sm text-gray-600">{toast.message}</div>
                </div>
                <button className="ml-4 text-gray-400 hover:text-gray-600" onClick={() => setToast(null)}>
                  ✖
                </button>
              </div>
            )}
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}