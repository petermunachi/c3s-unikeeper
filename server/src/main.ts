import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const config = new DocumentBuilder()
    .setTitle('UniKeeper Task Keeper')
    .setDescription('UniKeeper task keeper backend API')
    .setVersion('1.0')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);
  await app.listen(4000);

  console.log(`\n\n
    --------------------------------------------------
      Server is listening http://localhost:4000
    --------------------------------------------------
    \n`);
}
bootstrap();
