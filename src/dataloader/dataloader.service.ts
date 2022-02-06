import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UsersLoader } from 'src/users/users.loader';

@Injectable()
export class DataloaderService {
  constructor(private readonly usersLoader: UsersLoader) {}

  createLoaders() {
    return {
      usersLoader: new DataLoader((ids: string[]) =>
        this.usersLoader.getUsersByIds(ids),
      ),
    };
  }
}
