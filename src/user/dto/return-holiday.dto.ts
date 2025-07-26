import { IsNumber, IsString } from 'class-validator';

export class ReturnHoliday {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  @IsString()
  countryCode: string;
  @IsNumber()
  userId: number;
}
