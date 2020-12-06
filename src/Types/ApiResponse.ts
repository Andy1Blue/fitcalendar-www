interface Payload {
  email?: string;
  email_verified?: boolean;
  exp?: number;
  given_name?: string;
  iat?: number;
  iss?: string;
  jti?: string;
  locale?: 'pl' | string;
  picture?: string;
  sub?: string;
}

interface Response {
  isVerified: boolean;
  payload: Payload | null;
}

export interface ApiResponse {
  data: Response;
}

export interface TokenHeaderData {
  headers: {
    token: string;
  };
}
