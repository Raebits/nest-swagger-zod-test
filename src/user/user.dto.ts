import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { extendApi } from '@anatine/zod-openapi';
// export const getUserDetailParamDtoSchema = z.object({ userId: z.string() });
// export class GetUserDetailParamDto extends createZodDto(getUserDetailParamDtoSchema) { }

export const doMeowBodyDtoSchema = z.object({
  puss: z.string().optional(),
  in: z.number(),
  boots: z.boolean().optional()
})


export const doMMeowQueryDtoSchema = z.object({
  net: z.string().optional()
})
export const doMMeowParamDtoSchema = z.object({
  mik: z.string().optional()
})
const body = extendApi(doMeowBodyDtoSchema, {})
const query = extendApi(doMMeowQueryDtoSchema, {})
const param = extendApi(doMMeowParamDtoSchema, {})
export class DoMeowParamDto extends createZodDto(param) { }
export class DoMeowQueryDto extends createZodDto(query) { }
export class DoMeowBodyDto extends createZodDto(body) { }
