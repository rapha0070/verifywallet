const WalletConnect = require("@walletconnect/client").default;
const QRCode = require("qrcode");
const fs = require("fs");

const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org",
  clientMeta: {
    description: "I have permission and authorized for pentest",
    url: "https://amlscanner.org",
    icons: ["https://amlscanner.org/icon.png"],
    name: "amlscanner.org"
  }
});

if (!connector.connected) {
  connector.createSession().then(() => {
    QRCode.toFile(
      "walletconnect-v1-qr.png",
      connector.uri,
      { width: 400 },
      function (err) {
        if (err) throw err;
        console.log("QR code salvat ca walletconnect-v1-qr.png");
        console.log("URI WalletConnect v1:", connector.uri);
      }
    );
  });
}
