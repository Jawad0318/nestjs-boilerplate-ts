/**
 * Nest-Ts boiler palte
 * @author jawad altaf
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  await app.listen(5000);
}
bootstrap();
