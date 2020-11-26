import http from '../http';

export const responseGoogle = async (response: any) => {
  delete response.accessToken;
  delete response.tokenObj;
  delete response.Ca;
  delete response.googleId;
  delete response.wt;
  delete response.xc;
  delete response.scope;

  if (response.tokenId) {
    localStorage.setItem('token', response.tokenId);
  }

  window.location.reload();

  return {
    tokenId: response.tokenId,
    profile: response.profileObj,
  };
};

interface TokenBodyData {
  token: string;
}

export const verifyToken = (tokenBodyData: TokenBodyData) => {
  return http.post('/oauth', tokenBodyData);
};