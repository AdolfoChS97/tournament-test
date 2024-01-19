import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from "joi";

@Injectable()
export class JoiPipe implements PipeTransform {
    
    constructor(private schema: ObjectSchema) {}
    
    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value, { abortEarly: false, allowUnknown: true, stripUnknown: true  });
        if (error?.details.length > 0) {
            const errorDetail = error?.details?.map((err) => {
                const { message } = err;
                return `${message}`;
            }, '')
            throw new BadRequestException(errorDetail);
        }

        return value;
    }

}