import { httpClient } from "../../httpClient";
import { Transaction } from "../interfaces";


export async function getAll() {
  const { data } = await httpClient.get<Transaction[]>('/transactions');
  return data;
}
