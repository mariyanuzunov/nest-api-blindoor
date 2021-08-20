import { IsIn, IsNotEmpty, IsUrl, Min } from 'class-validator';

export class CreateDoorDto {
  @IsIn(['интериорна врата', 'входна врата'], { message: 'Invalid category!' })
  category: string;
  @IsNotEmpty({ message: 'Title is required!' })
  title: string;
  @IsNotEmpty({ message: 'Manufacturer is required!' })
  manufacturer: string;
  @IsNotEmpty({ message: 'Description is required!' })
  description: string;
  @Min(1, { message: 'The price must be a positive number!' })
  price: number;
  @IsUrl({}, { message: 'Invalid image URL address!' })
  imgUrl: string;
}
