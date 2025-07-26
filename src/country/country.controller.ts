import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryListDTO } from './dto/country-list.dto';
import { plainToInstance } from 'class-transformer';
import { FullCountryDTO } from './dto/full-country.dto';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}
  @Get()
  async getAvailableCountries(): Promise<CountryListDTO> {
    const result = await this.countryService.getAvailableCountries();
    return plainToInstance(CountryListDTO, result);
  }
  @Get(':code')
  async getCountryByCode(@Param('code') code: string): Promise<FullCountryDTO> {
    const result = await this.countryService.getCountryByCode(code);

    return plainToInstance(FullCountryDTO, result);
  }
}
