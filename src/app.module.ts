import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    RecipesModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    TasksModule,
  ],
})
export class AppModule {}
