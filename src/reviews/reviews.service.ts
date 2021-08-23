import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async createOne(createReviewDto: CreateReviewDto) {
    const review = new this.reviewModel(createReviewDto);
    return review.save();
  }

  getAll() {
    return this.reviewModel
      .find()
      .populate('author', {
        _id: 1,
        firstName: 1,
        lastName: 1,
      })
      .populate('product', {
        _id: 1,
        title: 1,
        imgUrl: 1,
      })
      .sort({ CreatedAt: 1 })
      .exec();
  }

  getUserReviews(userId: string) {
    return this.reviewModel
      .find({ author: userId })
      .populate('author', {
        _id: 1,
        firstName: 1,
        lastName: 1,
      })
      .populate('product', {
        _id: 1,
        title: 1,
        imgUrl: 1,
      })
      .exec();
  }

  getItemReviews(itemId: string) {
    return this.reviewModel
      .find({ product: itemId })
      .populate('author', {
        _id: 1,
        firstName: 1,
        lastName: 1,
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  deleteOne(id: string) {
    return this.reviewModel.findByIdAndDelete(id);
  }
}
