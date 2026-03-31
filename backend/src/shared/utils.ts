
const PBKDF2_ITERATIONS = 310_000;
const SALT_LENGTH = 16; // bytes
const KEY_LENGTH = 32;  // bytes
const DIGEST = "SHA-256";

async function deriveKey(password: string, salt: Uint8Array<ArrayBuffer>): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: DIGEST, salt, iterations: PBKDF2_ITERATIONS },
    keyMaterial,
    KEY_LENGTH * 8
  );
  return Array.from(new Uint8Array(bits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const utils = {
  hashPassword: async (password: string): Promise<string> => {
    const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
    const hash = await deriveKey(password, salt);
    const saltHex = Array.from(salt)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    // stored format: <saltHex>:<hash>
    return `${saltHex}:${hash}`;
  },
  verifyPassword: async (password: string, storedHash: string): Promise<boolean> => {
    const [saltHex, hash] = storedHash.split(":");
    if (!saltHex || !hash) return false;
    const salt = new Uint8Array(saltHex.match(/.{2}/g)!.map((b) => parseInt(b, 16))) as Uint8Array<ArrayBuffer>;
    const derived = await deriveKey(password, salt);
    // constant-time comparison to prevent timing attacks
    if (derived.length !== hash.length) return false;
    let diff = 0;
    for (let i = 0; i < derived.length; i++) {
      diff |= derived.charCodeAt(i) ^ hash.charCodeAt(i);
    }
    return diff === 0;
  },
};

export default utils;

export type Utils = typeof utils;