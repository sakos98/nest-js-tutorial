import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateOrderDTO{

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId: string;

  @Length(5, 20)
  @IsNotEmpty()
  @IsString()
  client: string;

  @IsNotEmpty()
  @IsString()
  address: string;
  propertyToUpdate: any;
}



