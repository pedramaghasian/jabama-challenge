# Fluentd Setup Instructions 

## step 0 : fluentd service

<p>
run your fluentd service with docker or just use use this command
</p>

```bash
  docker-compose docker-compose.yaml up -d
```

## step 1 : install following npm packages

```js
npm i cross-env fluent-logger nest-winston winston winston-transport
```

## step 2 : add the following line to your tsconfig.json

```json
{
    "compilerOptions": {
      "module": "commonjs",
      "declaration": true,
      "removeComments": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "allowSyntheticDefaultImports": true,
      "target": "es2017",
      "sourceMap": true,
      "outDir": "./dist",
      "baseUrl": "./",
      "incremental": true,
      "resolveJsonModule": true  // + add this line
    }
  }
  
```

## step 3 : add the following environment variables to your .env file 

```js 
FLUENTD_HOSTNAME=localhost
FLUENTD_PORT=24224
```

## step 4 : add fluent-logger config to your main.ts file

```ts
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as fluentNodeLogger from 'fluent-logger';
import * as PKG from '../package.json';


  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      exitOnError: false,
      transports: [
        new (fluentNodeLogger.support.winstonTransport())(
          PKG.name,
          {
            host: process.env.FLUENTD_HOSTNAME || 'localhost',
            port: process.env.FLUENTD_PORT || 24224,
            timeout: 3.0,
            requireAckResponse: true,
          },
        ),
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
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

```

## step 5 : replace this script in your package.json file

```json
    "start:local": "nest start --watch --exec \"cross-env dotenv_config_path=.env node -r dotenv/config\"",
    "start:dev": "nest start --watch --exec \"cross-env dotenv_config_path=.env.dev node -r dotenv/config\"",
```

## Congratulations! you are ready to use fluentd!