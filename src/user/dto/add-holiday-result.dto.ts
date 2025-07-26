import { IsNumber } from 'class-validator';

export class AddHolidayResultDTO {
  @IsNumber()
  addedHolidays: number;
}
