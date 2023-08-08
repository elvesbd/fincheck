import { httpClient } from "../../httpClient";
import { CreateBankAccountParams, BankAccount } from "../interfaces";


export async function create(params: CreateBankAccountParams) {
  const { data } = await httpClient.post<BankAccount>('/bank-accounts', params);
  return data;
}
