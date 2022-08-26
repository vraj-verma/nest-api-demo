import { Injectable } from '@nestjs/common';
import { UserDocument, User, AdminDocument, Admin } from './user.schema'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { queryParam } from './model/query';

@Injectable()
export class AppService {

  // USER MODEL
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>
  ) { }


  // Create User in MongoDB
  async addUser(user: User): Promise<User> {
    const data = await this.userModel.create(user);
    return data;
  }

  // get user from DB
  async getUser(data: queryParam): Promise<Array<User>> {
    return this.userModel.find();
  }

  // get user by id from DB
  async getById(id: string): Promise<any> {
    let user = await this.userModel.findById(id);
    return user;
  }


  // Update user from DB
  async update(id: string, body: any): Promise<any> {
    return this.userModel.findByIdAndUpdate(id,body);
  }


  // Delete user from DB
  async deleteUser(id:string):Promise<any>{
    return this.userModel.findByIdAndDelete(id);
  }

  // Get user
  async getByName(name:string):Promise<any>{
    return this.userModel.find({name: name});
  }



  // -----------
  // user array
  // userData: any[] = []

  // createUser(data: any): any {
  //   this.userData.push({ id: data.id, name: data.name });
  //   return this.userData
  // }

  // Get User
  // async getUser(): Promise<any[]> {
  //   const users = await this.userModel.find();
  //   return users;
  // }

  // Update user
  // async update(id: number, body: any): Promise<any> {
  //   const index = this.userData.findIndex(d => d.id === id);
  //   if (index == -1) {
  //     this.userData.push({ id, name: body.name })
  //     // console.log('No user found with this id');
  //   } else {
  //     this.userData.splice(index, 1, { id, name: body.name })
  //   }
  //   console.log(this.userData);
  //   return this.userData;
  // }

  // delete user by Id
  // async deleteUser(id: string): Promise<any> {
  //   let index = this.userData.findIndex(d => d.id === id);

  //   if (index == -1) {
  //     console.log('User not found');
  //   } else {
  //     this.userData.splice(index, 1)
  //   }
  //   return this.userData;
  // }

  // get user by
  // async getById(id: string): Promise<any> {
  //   let user = this.userData.find(d => d.id === id);
  //   if (user) {
  //     return user;
  //   } else {
  //     return { error: 'Not found' };
  //   }
  // }




}

