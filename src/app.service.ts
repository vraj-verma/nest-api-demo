import { Injectable } from '@nestjs/common';
import { UserDocument, User } from './user.schema'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) { }

  async addUser(user: User): Promise<User> {
    const data = new this.userModel(user);
    return data.save()
  }


  // user array
  userData: any[] = []

  // Create User
  createUser(data: any): any {
    this.userData.push({ id: data.id, name: data.name });
    return this.userData
  }

  // Get User
  async getUser(): Promise<any[]> {
    // return this.userData;

    const users = await this.userModel.find();
    return users;
  }

  // Update user
  async update(id: number, body: any): Promise<any> {
    const index = this.userData.findIndex(d => d.id === id);
    if (index == -1) {
      this.userData.push({ id, name: body.name })
      // console.log('No user found with this id');
    } else {
      this.userData.splice(index, 1, { id, name: body.name })
    }

    console.log(this.userData);
    return this.userData;

  }

  // delete user by Id
  async deleteUser(id: string): Promise<any> {
    let index = this.userData.findIndex(d => d.id === id);

    if (index == -1) {
      console.log('User not found');
    } else {
      this.userData.splice(index, 1)
    }
    return this.userData;
  }

  // get user by
  async getById(id: string): Promise<any> {
    let user = this.userData.find(d => d.id === id);
    if (user) {
      return user;
    } else {
      return { error: 'Not found' };
    }
  }




}

