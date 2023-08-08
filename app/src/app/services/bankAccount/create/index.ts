import { httpClient } from "../../httpClient";
import { BankAccountParams, BankAccountResponse } from "../interfaces";


export async function create(params: BankAccountParams) {
  const { data } = await httpClient.post<BankAccountResponse>('/bank-accounts', params);
  return data;
}
