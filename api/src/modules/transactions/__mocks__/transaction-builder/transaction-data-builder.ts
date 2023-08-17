import { CategoryDataBuilder } from 'src/modules/categories/__mocks__/category-builder';
import { TransactionResponseDto } from '../../dto';

export class TransactionDataBuilder {
  private transactionResponseDto: TransactionResponseDto = {
    id: '73620b0d-1a82-49bf-ba87-be74145052e9',
    value: 200,
    type: 'EXPENSE',
    userId: 'b013f8f4-804e-4816-b799-46044d86816c',
    bankAccountId: 'b013f8f4-804e-4816-b799-46044d86832a',
    name: 'Água',
    date: new Date('2023-08-17T13:13:11.207Z'),
    category: CategoryDataBuilder.aCategory().build(),
  };

  static aTransaction(): TransactionDataBuilder {
    return new TransactionDataBuilder();
  }

  withDifferentBankAccountId(
    this: TransactionDataBuilder,
  ): TransactionDataBuilder {
    this.transactionResponseDto.id = '12520b0d-1a82-49bf-ba87-be74145065a8';
    this.transactionResponseDto.value = 300;
    this.transactionResponseDto.type = 'EXPENSE';
    this.transactionResponseDto.userId = 'b013f8f4-804e-4816-b799-46044d86816c';
    this.transactionResponseDto.bankAccountId =
      'a540f8f4-804e-4816-b799-46044d86851c';
    this.transactionResponseDto.name = 'Internet';
    return this;
  }

  build(): TransactionResponseDto {
    return this.transactionResponseDto;
  }
}
