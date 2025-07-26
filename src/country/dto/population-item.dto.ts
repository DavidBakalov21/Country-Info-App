import { IsNumber } from 'class-validator';

export class PopulationItemDTO {
  @IsNumber()
  year: number;
  @IsNumber()
  population: number;
}
