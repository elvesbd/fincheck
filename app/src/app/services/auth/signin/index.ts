import { httpClient } from "../../httpClient";
import { SigninParams, SigninResponse } from "../interfaces";


export async function signin(params: SigninParams) {
  const { data } = await httpClient.post<SigninResponse>('/auth/signin', params)
  return data;
}
