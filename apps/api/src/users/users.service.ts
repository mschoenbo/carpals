import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { hash } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.findByEmail(dto.email);

    if (user)
      throw new ConflictException('User with this email already exists');

    const newUser = await this.prismaService.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 15),
      },
    });

    newUser.password = undefined;

    return newUser;
  }

  async findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(userId: string, dto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
  }
}
