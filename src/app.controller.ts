import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { User } from './user.schema';


@Controller('user')
export class AppController {
  constructor(private appService: AppService) { }


  // @Post('')
  // async createUser(@Body() data: any) {
  //   const user = await this.appService.createUser(data);
  //   if (user) {
  //     return `${JSON.stringify(user)}`
  //   } else {
  //     return 'User not created'
  //   }
  // }

  // will add in MongoDB
  @Post()
  async addUser(@Body() user: User): Promise<User> {
    return this.appService.addUser(user);
  }

  // get user
  @Get()
  async getUser(@Req() req: Request, @Res() res: Response): Promise<any> {
    let userDetail = await this.appService.getUser();
    return res.json(userDetail);
  }

  // update user
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any): Promise<any> {
    const newUser: any = await this.appService.update(id, body)
    return `${JSON.stringify(newUser)}`;
  }

  // get user by id
  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    console.log(id)
    const userById = await this.appService.getById(id);
    return `${JSON.stringify(userById)}`;
  }

  // delete user
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    const deleteUser = await this.appService.deleteUser(id);
    return `${JSON.stringify(deleteUser)}`
  }
}

