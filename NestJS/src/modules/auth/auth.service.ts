import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { sendMail } from 'src/common/nodemailer/init.nodemailer';
import { authenticator } from 'otplib';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async login(body: LoginDto) {
    const { email, password, token } = body;

    const userExist = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!userExist) {
      throw new BadRequestException(
        'Người dùng chưa tồn tại xin vui lòng đăng ký',
      );
    }

    if (!userExist.password) {
      throw new BadRequestException(
        'Cần đăng nhập bằng MXH để cập nhật password',
      );
    }

    // Kiểm tra Google Authenticator
    if (userExist.totpSecret) {
      if (!token) {
        return { isTotp: true };
      }

      const isCheck = authenticator.check(token, userExist.totpSecret);
      if (!isCheck) throw new BadRequestException('Token không hợp lệ');
    }

    const isPassword = bcrypt.compareSync(password, userExist.password);
    if (!isPassword) {
      throw new BadRequestException('Mật khẩu không chính xác');
    }

    // token: access-token | refresh-token
    const tokens = this.tokenService.createTokens(userExist.id);

    // sendMail(userExist.email)
    // sendMail('vulebaolong@gmail.com');

    return tokens;
  }
}
