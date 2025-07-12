import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { GlobalExceptionFilter } from '../common/filters/global-exception.filter';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleValidatorService } from '../role-validator/role-validator.service';
import { RequestWithUser } from '../common/interfaces/auth-interfaces';
import { UpdatePasswordDto } from './dtos/update-password.dto';

@UseFilters(GlobalExceptionFilter)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private roleValidator: RoleValidatorService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.userService.findOne(userId);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: RequestWithUser) {
    this.roleValidator.isAdmin(req.user.role);
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.error(updateUserDto);
    if (req.user.role !== 'ADMIN' && req.user.sub !== id) {
      throw new UnauthorizedException('Not authorized');
    }
    await this.userService.update(id, updateUserDto);
    return { message: 'User updated successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/updatePassword')
  async updatePassword(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (req.user.sub !== id) {
      throw new UnauthorizedException('Not authorized');
    }
    await this.userService.updatePassword(id, updatePasswordDto);
    return { message: 'Password updated successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    this.roleValidator.isAdmin(req.user.role);
    return this.userService.remove(id);
  }
}
