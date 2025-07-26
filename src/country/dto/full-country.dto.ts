import { IsUrl, ValidateNested } from 'class-validator';
import { CountryListDTO } from './country-list.dto';
import { CountryDTO } from './country.dto';
import { Type } from 'class-transformer';
import { PopulationChartDTO } from './population-chart.dto';

export class FullCountryDTO extends CountryDTO {
  @ValidateNested()
  @Type(() => CountryListDTO)
  border: CountryListDTO;
  @ValidateNested()
  @Type(() => PopulationChartDTO)
  population: PopulationChartDTO;
  @IsUrl()
  flagURL: string;
}
