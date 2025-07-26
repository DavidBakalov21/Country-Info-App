import { ReturnHoliday } from './return-holiday.dto';

export class ReturnUserDTO {
  id: number;
  name: string;
  email: string;
  holidays: ReturnHoliday[];
}
