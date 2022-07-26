import crypto from 'crypto';

const hashPassword = (pwd) => crypto.createHash("sha256").update(pwd).digest("base64");

export default hashPassword;