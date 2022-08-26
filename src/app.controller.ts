import { Query, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, Res, Headers } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { User } from './user.schema';
import { UserValidateSchema } from './validation';
import { JoiValidationPipe } from './pipe/validation.pipe'
import { queryParam } from './model/query';

interface querySchema {
  name: string,
  age: number
}

@Controller('user')
export class AppController {
  constructor(private appService: AppService) { }

  // will add in MongoDB
  @Post()
  async addUser(@Body(new JoiValidationPipe(UserValidateSchema.validateUser)) user: User): Promise<User> {
    return this.appService.addUser(user);
  }

  // get user
  @Get()
  async getUser(
    @Req() req: Request,
    @Res() res: Response,
    @Query(new JoiValidationPipe(UserValidateSchema.querySchema)) data: queryParam): Promise<any> {
    let userDetail = await this.appService.getUser(data);
    // console.log(req);
    // console.log('--');
    // console.log(res);
       
    return res.json(userDetail);
  }

  // update user
  @Put(':id')
  async update(@Param('id') id: string, @Body(new JoiValidationPipe(UserValidateSchema.updateUser)) body: any): Promise<any> {
    const newUser: any = await this.appService.update(id, body)
    return `${JSON.stringify(newUser)}`;
  }

  //  get by name
  @Get('name/:name')
  async getByName(@Param('name') name: string): Promise<any> {
    console.log(name)
    return await this.appService.getByName(name);
  }

  // get user by id
  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    const userById = await this.appService.getById(id);
    return `${JSON.stringify(userById)}`;
  }

  // delete user
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    const deleteUser = await this.appService.deleteUser(id);
    return `${JSON.stringify(deleteUser)}`
  }

  // get query 
  @Get('query/q')
  queryPara(@Query(new JoiValidationPipe(UserValidateSchema.querySchema2)) data: querySchema) {
    console.log(data);
    return 'Okay'
  }

  // get Header
  @Get('header/h')
  getHeaders(@Headers() header: any) {
    console.log(header);
    return header;
  }






  // @Post('post/user/p')
  // createUser(@Body() requestData:any){
  //   console.log(requestData);
  //   return {success:true}
  // }


}

