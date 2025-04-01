export default function handler(req, res) {
    const crypto = require("crypto");
  
    const apiPublicKey = '019dff9f775e24a000c6c263db176e7c';
    const apiPrivateKey = '504b389aa62025157eda08fd04a30651';

    // Generate current UTC Date in required format
    const date = new Date();
    const apiDate = date.toUTCString().replace('GMT', 'UTC');

    // Create HMAC-SHA256 signature
    const hmac = crypto.createHmac('sha256', apiPrivateKey);
    hmac.update(apiDate);
    const apiSignature = hmac.digest('hex');

  
    res.status(200).json({ apiDate, apiSignature, apiPublicKey });
  }
  