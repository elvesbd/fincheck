import { httpClient } from "../../httpClient";
import { SignupParams, SignupResponse } from "../interfaces";



export async function signup(params: SignupParams) {
  const { data } = await httpClient.post<SignupResponse>('/auth/signup', params)
  return data;
}
