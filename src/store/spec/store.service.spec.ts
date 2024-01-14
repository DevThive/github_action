import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from '../store.service';
import { Store } from '../../entity/store.entity';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [Store],
      providers: [StoreService],
    }).compile();

    service = module.get<StoreService>(StoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
