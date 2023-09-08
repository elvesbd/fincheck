import { BankAccountDto } from '../../repository/dto';

export class BankAccountDataBuilder {
  private bankAccountDto: BankAccountDto = {
    id: 'b013f8f4-804e-4816-b799-46044d86832a',
    userId: 'b013f8f4-804e-4816-b799-46044d86816c',
    name: 'Nu Test',
    initialBalance: 5000,
    type: 'CASH',
    color: '#FFF',
    transactions: [
      {
        id: '46e1bc27-8255-4239-854f-e9513434cb7e',
        userId: 'b013f8f4-804e-4816-b799-46044d86816c',
        bankAccountId: 'b013f8f4-804e-4816-b799-46044d86832a',
        name: 'Supermarket',
        date: new Date('2023-08-18T13:13:11.207Z'),
        type: 'EXPENSE',
        value: 1000,
      },
    ],
  };

  static aBankAccount(): BankAccountDataBuilder {
    return new BankAccountDataBuilder();
  }

  withInitialBalance(): this {
    this.bankAccountDto.initialBalance = 1000;
    return this;
  }

  withUpdates(): this {
    this.bankAccountDto.transactions[0].name = 'Freelancer';
    this.bankAccountDto.transactions[0].date = new Date(
      '2023-08-30T13:13:11.207Z',
    );
    this.bankAccountDto.transactions[0].type = 'INCOME';
    return this;
  }

  build(): BankAccountDto {
    return this.bankAccountDto;
  }
}
