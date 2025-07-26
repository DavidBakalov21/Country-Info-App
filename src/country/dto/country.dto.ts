import { IsString } from 'class-validator';

export class CountryDTO {
  @IsString()
  countryCode: string;
  @IsString()
  name: string;
}
