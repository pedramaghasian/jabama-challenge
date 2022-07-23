import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as fluentNodeLogger from 'fluent-logger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { name } from '../package.json';
import { AllExceptionFilter } from './shared/exception-handlers/all-exception.filter';

async function bootstrap(): Promise<void> {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      exitOnError: false,
      transports: [
        new (fluentNodeLogger.support.winstonTransport())(name, {
          host: process.env.FLUENTD_HOSTNAME || 'localhost',
          port: process.env.FLUENTD_PORT || 24224,
          timeout: 3.0,
          requireAckResponse: true,
        }),
        new winston.transports.Console({
          level: 'verbose',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.splat(),
            winston.format.json(),
            winston.format.colorize({ all: true }),
          ),
          handleExceptions: true,
        }),
      ],
    }),
  });
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('NESTJS_AUTHENTICATION')
    .addBearerAuth()
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);
  const port = configService.get<string>('PORT', '3000');
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(port, () => logger.log(`listening on port ${port}`));
}
bootstrap();
