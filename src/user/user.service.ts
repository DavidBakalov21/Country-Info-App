import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ReturnUserDTO } from './dto/return-user.dto';
import { AddHolidayDTO } from './dto/add-holiday.dto';
import axios from 'axios';
import { AddHolidayResultDTO } from './dto/add-holiday-result.dto';
import { Holiday } from './types/Holiday';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDTO): Promise<ReturnUserDTO> {
    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
      },
      include: {
        holidays: true,
      },
    });
  }
  async getUserById(id: number): Promise<ReturnUserDTO> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        holidays: true,
      },
    });
  }

  async addHolidaysToCalendar(
    userId: number,
    data: AddHolidayDTO,
  ): Promise<AddHolidayResultDTO> {
    try {
      const holidaysFromApi: Holiday[] = (
        await axios.get(
          `https://date.nager.at/api/v3/PublicHolidays/${data.year}/${data.countryCode}`,
        )
      ).data;

      if (!holidaysFromApi || holidaysFromApi.length === 0) {
        throw new NotFoundException(
          `No holidays found for ${data.countryCode} in ${data.year}`,
        );
      }

      const filteredHolidays: Holiday[] = data.holidays?.length
        ? holidaysFromApi.filter((h) => data.holidays.includes(h.localName))
        : holidaysFromApi;

      const result = await this.prisma.holiday.createMany({
        data: filteredHolidays.map((h) => ({
          userId,
          name: h.localName,
          countryCode: data.countryCode,
          year: data.year,
        })),
        skipDuplicates: true,
      });

      return { addedHolidays: result.count };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to add holidays: ${error.message}`,
      );
    }
  }
}
