export interface Hasher {
  hash(password: string, salt: string | number): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
