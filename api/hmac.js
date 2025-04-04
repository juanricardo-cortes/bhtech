export default function handler(req, res) {
    const crypto = require("crypto");

    // Check if the request method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Check if the request body contains the required keys
    if (!req.body || !req.body.apiPublicKey || !req.body.apiPrivateKey) {
        return res.status(400).json({ error: 'Public and private keys are required' });
    }

    const { apiPublicKey, apiPrivateKey } = req.body;

    // Generate current UTC Date in required format
    const date = new Date();
    const apiDate = date.toUTCString().replace('GMT', 'UTC');

    // Create HMAC-SHA256 signature
    const hmac = crypto.createHmac('sha256', apiPrivateKey);
    hmac.update(apiDate);
    const apiSignature = hmac.digest('hex');

    // Send the generated signature and other data back in the response
    res.status(200).json({ apiDate, apiSignature, apiPublicKey });
}