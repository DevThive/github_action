import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigService } from "@nestjs/config";
import { ConfigProjectModule } from "./config/config.module";
import { TypeormModule } from "./typeorm/typeorm.module";

@Module({
    imports: [
        ConfigProjectModule,
        TypeormModule.forRoot(),
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
    exports: [ConfigService],
})
export class AppModule {}
