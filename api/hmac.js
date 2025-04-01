export default function handler(req, res) {
    const crypto = require("crypto");
  
    const apiPublicKey = '504b389aa62025157eda08fd04a30651';
    const apiPrivateKey = '019dff9f775e24a000c6c263db176e7c';
    const date = new Date();
    const apiDate = date.toUTCString().replace('GMT', 'UTC');
  
    const hmac = crypto.createHmac('sha256', apiPrivateKey);
    hmac.update(apiDate);
    const apiSignature = hmac.digest('hex');
  
    res.status(200).json({ apiDate, apiSignature, apiPublicKey });
  }
  