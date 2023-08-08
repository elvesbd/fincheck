import { httpClient } from "../../httpClient";
import { UpdateBankAccountParams, BankAccount } from "../interfaces";


export async function update({ id, ...params }: UpdateBankAccountParams) {
  const { data } = await httpClient.put<BankAccount>(`/bank-accounts/${id}`, params);
  return data;
}
