import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from 'src/auth/auth.module';
import { DataloaderModule } from 'src/dataloader/dataloader.module';
import { DataloaderService } from 'src/dataloader/dataloader.service';
import { DateScalar } from 'src/common/scalars/date.scalar';
import { TasksModule } from 'src/tasks/tasks.module';
import { UsersModule } from 'src/users/users.module';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRootAsync({
      imports: [DataloaderModule],
      useFactory: (dataloaderService: DataloaderService) => ({
        installSubscriptionHandlers: true,
        autoSchemaFile: 'schema.gql',
        context: () => ({
          dataloader: dataloaderService.createLoaders(),
        }),
      }),
      inject: [DataloaderService],
    }),
    TasksModule,
    AuthModule,
    UsersModule,
    DataloaderModule,
  ],
  providers: [DateScalar],
})
export class AppModule {}
