import { BankAccountResponseDto } from '../../dtos/bank-account-response.dto';

export class BankAccountDataBuilder {
  private bankAccountResponseDto: BankAccountResponseDto = {
    id: 'b013f8f4-804e-4816-b799-46044d86832a',
    userId: 'b013f8f4-804e-4816-b799-46044d86816c',
    name: 'Nu Test',
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

  withUpdates(): this {
    this.bankAccountResponseDto.name = 'Ebd Bank';
    this.bankAccountResponseDto.initialBalance = 2000;
    this.bankAccountResponseDto.type = 'CHECKING';
    this.bankAccountResponseDto.color = '#777777';
    return this;
  }

  build(): BankAccountResponseDto {
    return this.bankAccountResponseDto;
  }
}
