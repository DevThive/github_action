import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const { email } = createUserDto;

        const isUser = await this.findUserByEmail(email);

        if (isUser) {
            throw new ConflictException("이미 존재하는 이메일입니다.");
        }

        const user = await this.userRepository.save(createUserDto);

        return user.id;
    }

    async findAll() {
        return await this.userRepository.find({
            select: ["id", "email", "name", "createdAt", "updatedAt"],
        });
    }

    async findUserById(id: number) {
        return await this.userRepository.findOne({
            where: { id },
            select: ["id", "email", "name", "createdAt", "updatedAt"],
        });
    }

    async findUserByIdWithStore(id: number) {
        return await this.userRepository.findOne({
            where: { id },
            select: ["id", "email", "name", "createdAt", "updatedAt"],
            relations: { store: true },
        });
    }

    async findUserByEmail(email: string) {
        return await this.userRepository.findOne({
            where: { email },
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const isUser = await this.findUserById(id);

        if (!isUser) {
            throw new NotFoundException("존재하지 않는 사용자입니다.");
        }

        const result = await this.userRepository.update(
            {
                id,
            },
            {
                ...updateUserDto,
            },
        );

        return result;
    }

    async remove(id: number) {
        const isUser = await this.findUserById(id);

        if (!isUser) {
            throw new NotFoundException("존재하지 않는 사용자입니다.");
        }

        const result = await this.userRepository.delete({ id });

        return result;
    }
}
