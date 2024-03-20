import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

const zEnvValidationSchema = z.object({
  // NODE_ENV: z.enum(['PRODUCTION', 'DEVELOPMENT', 'LOCAL']),
  APP_PORT: z.number({ coerce: true }).min(1000),
  DOC_URL: z.string(),
  DATABASE_URL: z.string().url(),
  ADMIN_JWT_SECRET: z.string(),
  USER_JWT_SECRET: z.string(),
  DEVICE_JWT_SECRET: z.string(),

  TMP_FILE_PATH: z.string().nonempty('File path cannot be empty').refine(
    (value) => /^(\/[^\/\0]+)+\/?$/.test(value),
    { message: 'Invalid Linux file directory path' }
  ),

  DEFAULT_IMAGE_COMPRESSION_WIDTH: z.number({ coerce: true }).min(0),
  DEFAULT_IMAGE_COMPRESSION_HEIGHT: z.number({ coerce: true }).min(0),
})

export type IAppConfig = z.infer<typeof zEnvValidationSchema>
export type Env = IAppConfig

@Injectable()
export class AppConfig {
  public env: Env
  constructor(private readonly configService: ConfigService) {
    this.env = new Proxy(({}) as Env, {
      get: (_, prop: keyof IAppConfig) => {
        if (zEnvValidationSchema.keyof()._def.values.includes(prop)) return this.configService.get(prop)
        throw new Error(`Property '${prop}' does not exist in AppConfig.`)
      },
    })
  }

  public static validate(env: unknown) {
    try {
      return zEnvValidationSchema.parse(env)
    } catch (error) {
      console.error(error)
      process.exit(1)
      throw error
    }
  }
}
