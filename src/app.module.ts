import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sumitverma:omsairam786@cluster0.dhy3h4y.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema }
      ]
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

