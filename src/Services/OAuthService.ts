import { GoogleLoginResponse } from 'react-google-login';
import http from '../http';
import { ApiResponse } from '../Types/ApiResponse';

interface GoogleLoginAdditionalFieldResponse {
  Ca: string;
  wt: string;
  xc: string;
  scope: string;
}

const token = localStorage.getItem('token');

export const responseGoogle = async (response: GoogleLoginResponse & GoogleLoginAdditionalFieldResponse) => {
  delete response.accessToken;
  delete response.tokenObj;
  delete response.Ca;
  delete response.googleId;
  delete response.wt;
  delete response.xc;
  delete response.scope;

  if (response.tokenId) {
    localStorage.setItem('token', response.tokenId);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return {
    tokenId: response.tokenId,
    profile: response.profileObj,
  };
};

export const checkToken = async (
  setIsVerifiedCallback: Function,
  setGiveNameCallback?: Function,
  setPictureCallback?: Function,
  setEmailCallback?: Function
) => {
  try {
    const response: ApiResponse = await verifyToken({ token });

    if (setIsVerifiedCallback) {
      setIsVerifiedCallback(response.data.isVerified);
    }

    if (setGiveNameCallback) {
      setGiveNameCallback(response.data.payload.given_name);
    }

    if (setPictureCallback) {
      setPictureCallback(response.data.payload.picture);
    }

    if (setEmailCallback) {
      setEmailCallback(response.data.payload.email);
    }
  } catch (e) {
    setIsVerifiedCallback(false);
    throw new Error("Can't authenticate user");
  }
};

interface TokenBodyData {
  token: string;
}

export const verifyToken = (tokenBodyData: TokenBodyData) => {
  return http.post('/oauth', tokenBodyData).catch(() => {
    throw new Error("Can't authenticate user");
  });
};
