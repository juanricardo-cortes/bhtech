export default function handler(req, res) {
    const crypto = require("crypto");
  
    const apiPublicKey = '...';
    const apiPrivateKey = '...';
    const date = new Date();
    const apiDate = date.toUTCString().replace('GMT', 'UTC');
  
    const hmac = crypto.createHmac('sha256', apiPrivateKey);
    hmac.update(apiDate);
    const apiSignature = hmac.digest('hex');
  
    res.status(200).json({ apiDate, apiSignature, apiPublicKey });
  }
  