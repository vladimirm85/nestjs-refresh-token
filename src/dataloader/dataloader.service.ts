import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UsersLoader } from 'src/users/users.loader';
import { User } from 'src/users';

export interface DataLoaders {
  usersLoader: DataLoader<string, User, string>;
}

@Injectable()
export class DataloaderService {
  constructor(private readonly usersLoader: UsersLoader) {}

  createLoaders(): DataLoaders {
    return {
      usersLoader: new DataLoader((ids: string[]) =>
        this.usersLoader.getUsersByIds(ids),
      ),
    };
  }
}
