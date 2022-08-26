import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const {error, value:schema} = this.schema.validate(value);
    if (error) {
        let error_msg = error.details[0].message.replace(/([\""/])/g,'')
        throw new BadRequestException(error_msg);
    }
    return schema;
  }
}