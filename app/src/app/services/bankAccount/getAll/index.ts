import { httpClient } from "../../httpClient";
import { BankAccounts } from "../interfaces";


export async function getAll() {
  const { data } = await httpClient.get<BankAccounts[]>('/bank-accounts');
  return data;
}
