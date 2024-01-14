import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { accessTokenGuard } from '../auth/guard/access-token.guard';
import { UserId } from '../auth/decorators/userId.decorator';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller("store")
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    //지점 전체 조회
    // @ApiBearerAuth("accessToken")
    // @UseGuards(accessTokenGuard)
    @Get("")
    async storelist() {
        return await this.storeService.storelist();
    }

    //특정 지점 조회
    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Get("/:id")
    findStoreById(@Param() storeid: number, @UserId() userid: number) {
        return this.storeService.findstoreByid(storeid, userid);
    }

    //지점 등록
    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Post("")
    async createStore(@Body() createStoreDto: CreateStoreDto, @UserId() userid: number){
        return await this.storeService.createStore(createStoreDto, userid)
    }

    //지점 수정
    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Put("/:storeid")
    async updateStore(@Body() updateStoreDto: UpdateStoreDto, @UserId() userid:number) {
        return await this.storeService.updateStore(updateStoreDto, userid)
    }

    //지점 삭제 (회원탈퇴시 자동으로 삭제하도록?)

    

}
