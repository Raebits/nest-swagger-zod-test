import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ZodDtoStatic } from '@anatine/zod-nestjs';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  public transform(value: unknown, metadata: ArgumentMetadata): unknown {
    const zodSchema = (metadata?.metatype as ZodDtoStatic)?.zodSchema
    if (zodSchema) {
      const parseResult = zodSchema.safeParse(value)
      if (parseResult.success === false) {
        const { error } = parseResult
        throw error;
      }
      return parseResult.data
    }
    return value
  }
}
