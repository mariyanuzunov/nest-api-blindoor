import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'Author field is required!' })
  author: string;
  @IsNotEmpty({ message: 'Product field is required!' })
  product: string;
  @IsNotEmpty({ message: 'Content field is required!' })
  @MaxLength(500, {
    message: 'The content should not exceed 500 characters!',
  })
  content: string;
}
