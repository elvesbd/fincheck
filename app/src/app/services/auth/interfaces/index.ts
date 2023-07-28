export interface SignupParams {
  name: string;
  email: string;
  password: string
}

export interface SignupResponse {
  accessToken: string;
}

export interface SigninParams {
  email: string;
  password: string
}

export interface SigninResponse extends SignupResponse {}
