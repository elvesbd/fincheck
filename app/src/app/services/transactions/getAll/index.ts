import { httpClient } from "../../httpClient";
import { Transaction, TransactionFilters } from "../interfaces";


export async function getAll(filters: TransactionFilters) {
  const { data } = await httpClient.get<Transaction[]>('/transactions', {
    params: filters
  });
  return data;
}
