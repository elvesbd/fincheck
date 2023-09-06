import { Test, TestingModule } from '@nestjs/testing';
import { RemoveTransactionsService } from './remove.service';
import { TransactionsRepository } from 'src/modules/transactions/repository';
import { ValidateEntitiesOwnerShipService } from '../../domain';

describe('RemoveTransactionsService', () => {
  let sut: RemoveTransactionsService;
  let transactionRepository: TransactionsRepository;
  let validateEntitiesOwnerShipService: ValidateEntitiesOwnerShipService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const TransactionsRepositoryProvider = {
      provide: 'TRANSACTIONS_REPOSITORY',
      useValue: {
        remove: jest.fn().mockResolvedValue(void 0),
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
        RemoveTransactionsService,
        TransactionsRepositoryProvider,
        ValidateEntitiesOwnerShipServiceProvider,
      ],
    }).compile();

    sut = module.get<RemoveTransactionsService>(RemoveTransactionsService);
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
