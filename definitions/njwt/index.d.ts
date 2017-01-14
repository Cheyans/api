declare module "njwt" {
  export interface Verifier {
    setSigningAlgorithm(alg: string): this;
    setSigningKey(key: string): this;
    verify(jwt: string, cb: VerifyCallback): void;
  }

  export interface Jwt {
    header: JwtHeader;
    body: JwtBody;
    setJti(jti: string): this;
    setSubject(sub: string | number): this;
    setIssuer(iss: string): this;
    setIssuedAt(iat: number): this;
    setExpiration(exp: Date | number): this;
    setNotBefore(exp: Date | number): this;
    setSigningKey(key: string): this;
    setSigningAlgorithm(alg: string): this;
    sign(payload: string, algorithm: string, cryptoInput: string): string;
    compact(): string;
    isExpired(): boolean;
    isNotBefore(): boolean;
  }

  export interface JwtHeader {
    typ: string;
    alg: string;
    reservedKeys: ["typ", "alg"];
    compact(): string;
  }

  export interface JwtBody {
    toJSON(): JwtBodyJSON;
    compact(): string;
  }

  export interface JwtBodyJSON {
    sub?: string | number;
    jti: string;
    iat: number;
    exp: number;
  }

  export interface JwtError extends Error {
    name: "JwtError";
    message: string;
  }

  export interface JwtParseError extends Error {
    name: "JwtParseError";
    message: string;
    jwtString: string;
    parsedHeader: Error | JwtHeader;
    parsedBody: Error | JwtBody;
    innerError: any;
  }

  export function verify(jwtString: string, secret: string, cb: VerifyCallback): void;
  export function verify(jwtString: string, secret: string, alg: string, cb: VerifyCallback): void;
  export function create(claims: {[key: string]: string | number}, secret: string , alg?: string): Jwt;

  export interface VerifyCallback {
    (err: Error, jwt: Jwt): void;
  }
}
