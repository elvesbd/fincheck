export interface Hash {
  generate(password: string, salt: string | number): Promise<string>;
}
