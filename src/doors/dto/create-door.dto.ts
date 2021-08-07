import { IsIn, IsNotEmpty, IsUrl, Min } from 'class-validator';

export class CreateDoorDto {
  @IsIn(['интериорна врата', 'входна врата'])
  category: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  manufacturer: string;
  @IsNotEmpty()
  description: string;
  @Min(1)
  price: number;
  @IsUrl()
  imgUrl: string;
}
