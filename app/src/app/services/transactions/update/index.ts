import { httpClient } from "../../httpClient";
import { Transaction } from "../interfaces";


export async function update({ id, ...params }: Transaction) {
  const { data } = await httpClient.put<Transaction>(`/transactions/${id}`, params);
  return data;
}
