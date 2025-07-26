import { IsArray, IsNumber, IsString, Min } from 'class-validator';

export class AddHolidayDTO {
  @IsString()
  countryCode: string;
  @IsNumber()
  @Min(1)
  year: number;
  @IsArray()
  @IsString({ each: true })
  holidays: string[];
}
