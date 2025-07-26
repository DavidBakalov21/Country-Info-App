import { IsArray, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';
import { CountryDTO } from './country.dto';

export class CountryListDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CountryDTO)
  countries: CountryDTO[];
}
