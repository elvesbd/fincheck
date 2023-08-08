import { httpClient } from "../../httpClient";
import { CreateTransactionParams, Transaction } from "../interfaces";


export async function create(params: CreateTransactionParams) {
  const { data } = await httpClient.post<Transaction>('/transactions', params);
  return data;
}
