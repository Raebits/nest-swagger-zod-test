import { Body, Controller, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { DoMeowBodyDto, DoMeowParamDto, DoMeowQueryDto } from './user.dto';

// @ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/meow/:mik')
  async getMeow(
    @Query() query: DoMeowQueryDto,
    @Param() param: DoMeowParamDto,
    @Body() body?: DoMeowBodyDto
  ) {
    console.log('do meow')
    console.log(query)
    console.log(body)
    console.log(param)
    return this.userService.doMeow()
  }
}
