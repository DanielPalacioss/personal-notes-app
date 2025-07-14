import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { UserService } from './user/user.service';

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-require-imports
  const cookieParser = require('cookie-parser');
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [`${process.env.CORS_ORIGIN_PORT}`],
    methods: 'GET,PATCH,POST,DELETE',
    credentials: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // lanza error si llegan propiedades no permitidas
      transform: true, // transforma payloads a instancias de clase
    }),
  );
  await app.listen(process.env.PORT_BACKEND ?? 4000);

  const userService = app.get(UserService);
  const firstName = process.env.ADMIN_NAME || 'daniel';
  const lastName = process.env.ADMIN_LASTNAME || 'palacios';
  const email = process.env.ADMIN_EMAIL || 'daniel@gmail.com';
  const username = process.env.ADMIN_USERNAME || 'MrDaniel';
  const password = process.env.ADMIN_PASSWORD || 'daniel1202*';

  const user = await userService.findByUsername(username);
  if (!user) {
    await userService.create({
      firstName,
      lastName,
      email,
      password,
      username,
    });
  }
}

bootstrap();
