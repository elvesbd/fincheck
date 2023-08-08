import { httpClient } from "../../httpClient";
import { BankAccountParams, BankAccount } from "../interfaces";


export async function create(params: BankAccountParams) {
  const { data } = await httpClient.post<BankAccount>('/bank-accounts', params);
  return data;
}
