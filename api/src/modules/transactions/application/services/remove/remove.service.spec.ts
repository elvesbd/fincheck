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

  describe('execute', () => {
    const transactionId = '73620b0d-1a82-49bf-ba87-be74145052e9';
    const userId = 'b013f8f4-804e-4816-b799-46044d86816c';

    it('should be called validateEntitiesOwnerShipService.execute with correct values', async () => {
      await sut.execute(transactionId, userId);
      expect(validateEntitiesOwnerShipService.execute).toHaveBeenCalledTimes(1);
      expect(validateEntitiesOwnerShipService.execute).toHaveBeenCalledWith({
        userId,
        transactionId,
      });
    });
  });
});
