import { BankAccountResponseDto } from '../../dtos/bank-account-response.dto';

export class BankAccountDataBuilder {
  private bankAccountResponseDto: BankAccountResponseDto = {
    id: 'b013f8f4-804e-4816-b799-46044d86832a',
    userId: 'b013f8f4-804e-4816-b799-46044d86816c',
    name: 'John Doe',
    initialBalance: 0,
    type: 'CASH',
    color: '#FFF',
  };

  static aBankAccount(): BankAccountDataBuilder {
    return new BankAccountDataBuilder();
  }

  withInitialBalance(): this {
    this.bankAccountResponseDto.initialBalance = 1000;
    return this;
  }

  build(): BankAccountResponseDto {
    return this.bankAccountResponseDto;
  }
}
