import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRootAsync({
//       useFactory: () => ({
//         type: 'mysql',
//         host: process.env.DATABASE_HOST,
//         port: +process.env.DATABASE_PORT,
//         username: process.env.DATABASE_USER,
//         password: process.env.DATABASE_PASSWORD,
//         database: process.env.DATABASE_NAME,
//         autoLoadEntities: true,
//       }),
//     }),
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DATABASE_HOST'),
        port: config.get('DATABASE_PORT'),
        username: config.get('DATABASE_USER'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
}
