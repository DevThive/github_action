import { Injectable, NotFoundException } from "@nestjs/common";
import { Store } from "../entity/store.entity";
import { Repository } from "typeorm";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { UserService } from "..//user/user.service";

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(Store)
        private storeRepository: Repository<Store>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly userService: UserService,
    ) {}

    //지점 전체 조회
    async storelist() {
        const store = await this.storeRepository.find({});

        return store;
    }

    //본인 지점 조회
    async findMystoreByid(userid: number) {
        const user = await this.userService.findUserByIdWithStore(userid);

        if (!user.store) {
            throw new NotFoundException("존재하지 않는 지점입니다.");
        }

        return user.store;
    }

    //지점 상세 조회
    async findstoreByid(storeid: number) {
        const store = await this.storeRepository.find({
            where: { id: storeid },
            select: [
                "store_name",
                "store_desc",
                "store_img",
                "store_address",
                "store_open",
                "store_close",
            ],
        });

        return store;
    }

    //지점 등록
    async createStore(createStoreDto: CreateStoreDto, userid: number) {
        const user = await this.userService.findUserById(userid);
        const store = await this.storeRepository.save({
            ...createStoreDto,
            admin: user,
            // 위치 확인 하는 부분 검색하고, 디비에 저장하도록
            // latitude: ?
            // longitude: ?
        });

        return store;
    }

    //지점 수정
    async updateStore(updateStoreDto: UpdateStoreDto, storeid: number) {
        await this.findstoreByid(storeid);

        await this.storeRepository.update(
            {
                id: storeid,
            },
            {
                ...updateStoreDto,
            },
        );

        return { message: "지점 정보가 수정되었습니다." };
    }
}
