import { httpClient } from "../../httpClient";
import { MeResponse } from "../interfaces";



export async function me() {
  const { data } = await httpClient.get<MeResponse>('/users/me')
  return data;
}
