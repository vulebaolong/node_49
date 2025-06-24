import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/article/article.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { ProtectStrategy } from './modules/auth/protect/protect.strategy';


@Module({
  imports: [ConfigModule.forRoot(), ArticleModule, PrismaModule, UserModule, AuthModule, TokenModule],
  controllers: [AppController],
  providers: [AppService, ProtectStrategy],
})
export class AppModule {}
