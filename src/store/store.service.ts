import { Injectable } from '@nestjs/common';
import { Store } from '../entity/store.entity';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(Store)
        private storeRepository: Repository<Store>
    ) {}

    //지점 전체 조회
    async storelist() {
        const store = await this.storeRepository.find({})

        return store;
    }

    //특정 지점 조회
    async findstoreByid(storeid: number, userid:number) {

    }

    //지점 등록
    async createStore(createStoreDto: CreateStoreDto, userid: number) {

    }

    //지점 수정
    async updateStore(updateStoreDto: UpdateStoreDto, userid: number) {

    }
}
