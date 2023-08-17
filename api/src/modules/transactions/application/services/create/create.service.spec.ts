import { Test, TestingModule } from '@nestjs/testing';
import { CreateTransactionsService } from './create.service';
import { TransactionsRepository } from 'src/modules/transactions/repository';
import { ValidateEntitiesOwnerShipService } from '../../domain';

describe('CreateTransactionsService', () => {
  let sut: CreateTransactionsService;
  let transactionRepository: TransactionsRepository;
  let validateEntitiesOwnerShipService: ValidateEntitiesOwnerShipService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const TransactionsRepositoryProvider = {
      provide: 'TRANSACTIONS_REPOSITORY',
      useValue: {
        create: jest.fn(),
      },
    };

    const ValidateEntitiesOwnerShipServiceProvider = {
      provide: ValidateEntitiesOwnerShipService,
      useValue: {
        execute: jest.fn().mockResolvedValue(void 0),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionsService,
        TransactionsRepositoryProvider,
        ValidateEntitiesOwnerShipServiceProvider,
      ],
    }).compile();

    sut = module.get<CreateTransactionsService>(CreateTransactionsService);
    transactionRepository = module.get<TransactionsRepository>(
      'TRANSACTIONS_REPOSITORY',
    );
    validateEntitiesOwnerShipService =
      module.get<ValidateEntitiesOwnerShipService>(
        ValidateEntitiesOwnerShipService,
      );
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(transactionRepository).toBeDefined();
    expect(validateEntitiesOwnerShipService).toBeDefined();
  });
});
