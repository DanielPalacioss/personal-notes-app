import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
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

@UseFilters(GlobalExceptionFilter)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private roleValidator: RoleValidatorService,
  ) {}

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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    this.roleValidator.isAdmin(req.user.role);
    return this.userService.remove(id);
  }
}
