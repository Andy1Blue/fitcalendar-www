import http from '../http';
import { ApiResponse } from '../Types/ApiResponse';

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

export const checkToken = async (setIsVerifiedCallback: any, setGiveNameCallback?: any, setPictureCallback?: any) => {
  const token = localStorage.getItem('token');

  try {
    const response: ApiResponse = await verifyToken({ token });

    setIsVerifiedCallback(response.data.isVerified);

    if (setGiveNameCallback) {
      setGiveNameCallback(response.data.payload.given_name);
    }

    if (setPictureCallback) {
      setPictureCallback(response.data.payload.picture);
    }
  } catch (e) {
    setIsVerifiedCallback(false);
  }
};

interface TokenBodyData {
  token: string;
}

export const verifyToken = (tokenBodyData: TokenBodyData) => {
  return http.post('/oauth', tokenBodyData);
};
