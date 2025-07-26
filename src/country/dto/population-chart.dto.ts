import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { PopulationItemDTO } from './population-item.dto';

export class PopulationChartDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PopulationItemDTO)
  populationData: PopulationItemDTO[];
}
