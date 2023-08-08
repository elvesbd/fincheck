import { httpClient } from "../../httpClient";


export async function remove(bankAccountId: string) {
  const { data } = await httpClient.delete<void>(`/bank-accounts/${bankAccountId}`);
  return data;
}
