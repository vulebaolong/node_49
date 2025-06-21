import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

// localhost:3069/article/article
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(
    @Query()
    query: any,
    @Param()
    params: any,
    @Headers()
    headers: any,
    @Body()
    body: any,
    @Req()
    req: Request,
  ) {
    console.log({ query, params, headers, body, req });
    const data = await this.articleService.findAll(req);
    return data;
  }
}
