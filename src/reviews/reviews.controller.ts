import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Public()
  @Post()
  createOne(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createOne(createReviewDto);
  }

  @Public()
  @Get()
  getAll() {
    return this.reviewsService.getAll();
  }

  // @Public()
  // @Get(':id')
  // getOne(@Param('id') id: string) {
  //   return this.reviewsService.getOne(id);
  // }

  @Public()
  @Get('item-reviews/:id')
  async getItemReview(@Param('id') id: string) {
    return this.reviewsService.getItemReviews(id);
  }

  @Public()
  @Get('my-reviews')
  getUserReviews() {}

  @Public()
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reviewsService.deleteOne(id);
  }
}
