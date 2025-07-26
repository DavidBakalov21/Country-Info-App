import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { CountryListDTO } from './dto/country-list.dto';
import { FullCountryDTO } from './dto/full-country.dto';
import { plainToInstance } from 'class-transformer';
import { PopulationChartDTO } from './dto/population-chart.dto';
import { CountryDTO } from './dto/country.dto';
import { Border } from './types/border';
import { PopulationItem } from './types/Population';

@Injectable()
export class CountryService {
  async getAvailableCountries(): Promise<CountryListDTO> {
    return (await axios.get('https://date.nager.at/api/v3/AvailableCountries'))
      .data;
  }
  async getCountryByCode(code: string): Promise<FullCountryDTO> {
    try {
      const borderData = (
        await axios.get(`https://date.nager.at/api/v3/CountryInfo/${code}`)
      ).data;

      if (!borderData) {
        throw new Error(`Country with code ${code} not found`);
      }

      const commonName = borderData.commonName;

      const populationRes = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/population',
        { country: commonName },
      );

      const flagRes = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/flag/images',
        { country: commonName },
      );

      const borders: CountryDTO[] = (borderData.borders || []).map(
        (border: Border) => ({
          countryCode: border.countryCode,
          name: border.commonName,
        }),
      );

      const borderDTO: CountryListDTO = plainToInstance(CountryListDTO, {
        countries: borders,
      });

      const populationData = (populationRes.data?.data?.populationCounts || [])
        .filter((p: PopulationItem) => p.year && p.value)
        .map((p: PopulationItem) => ({
          year: Number(p.year),
          population: p.value,
        }));

      const populationDTO: PopulationChartDTO = plainToInstance(
        PopulationChartDTO,
        {
          populationData,
        },
      );

      const flagURL: string = flagRes.data?.data?.flag;

      return plainToInstance(FullCountryDTO, {
        countryCode: borderData.countryCode,
        name: borderData.commonName,
        border: borderDTO,
        population: populationDTO,
        flagURL,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching country data: ${error.message}`,
      );
    }
  }
}
