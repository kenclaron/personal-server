export type ResponseError = {
  status: number;
  response: {
    url: string;
    status: number;
    headers: {
      "access-control-allow-origin": string;
      "access-control-expose-headers": string;
      "content-encoding": string;
      "content-security-policy": string;
      "content-type": string;
      date: string;
      "github-authentication-token-expiration": string;
      "referrer-policy": string;
      server: string;
      "strict-transport-security": string;
      "transfer-encoding": string;
      vary: string;
      "x-content-type-options": string;
      "x-frame-options": string;
      "x-github-media-type": string;
      "x-github-request-id": string;
      "x-ratelimit-limit": string;
      "x-ratelimit-remaining": string;
      "x-ratelimit-reset": string;
      "x-ratelimit-resource": string;
      "x-ratelimit-used": string;
      "x-xss-protection": string;
    };
    data: {
      message: string;
      documentation_url: string;
    };
  };
  request: {
    method: string;
    url: string;
    headers: {
      accept: string;
      "user-agent": string;
      authorization: string;
    };
    request: { hook: () => void };
  };
};
