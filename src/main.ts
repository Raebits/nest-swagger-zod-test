import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from './app.config';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';

// patchNestjsSwagger()
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const env = app.get(AppConfig).env
  const port = env.APP_PORT

  const config = new DocumentBuilder()
    .setTitle('sssss lf w')
    .setVersion('0.1.0')
    // .addBearerAuth()
    // .setBasePath(env.DOC_URL)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // console.log(JSON.stringify(document, null, 2))
  // console.log(document.paths['/user/meow/{mik}'].post.parameters)
  // SwaggerModule.setup('docs', app, document, {
  //   swaggerOptions: {
  //     persistAuthorization: true,
  //   },
  // });

  SwaggerModule.setup('api-docs', app, document);
  await app.listen(port);
  console.log('server run on http://localhost:' + port);
}
bootstrap();
