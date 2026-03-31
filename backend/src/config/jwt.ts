import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';

type Payload = {
  sub: string;
  aud: string;
  iss: string;
}

export function jwtUtils(secretKey: string) {
  const create_access_token = (
    sub: string,
    aud: string,
    iss: string,
    extra?: Record<string, unknown>,
    expiresIn?: string
  ) => {
    const payload: Payload = { sub, aud, iss, ...extra };
    const options: SignOptions = { expiresIn: (expiresIn ?? '1h') as SignOptions['expiresIn'] };
    return jwt.sign(payload, secretKey, options);
  };

  const verify_access_token = (token: string, aud: string, iss: string) => {
    try {
      return jwt.verify(token, secretKey, { audience: aud, issuer: iss });
    } catch {
      throw new Error('Invalid token');
    }
  };

  return { create_access_token, verify_access_token };
}

export type JwtUtils = ReturnType<typeof jwtUtils>;
