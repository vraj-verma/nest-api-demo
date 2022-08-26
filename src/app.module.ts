import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, Admin, AdminSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sumitverma:omsairam786@cluster0.dhy3h4y.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema },
        { name: Admin.name, schema: AdminSchema },
      ]
    ),
    // ConfigModule.forRoot({
    //   isGlobal: false
    //  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

