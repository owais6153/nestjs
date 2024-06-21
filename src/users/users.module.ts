import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersMiddleware } from './users.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsersMiddleware).forRoutes(UsersController);
    // consumer.apply(UsersMiddleware).forRoutes('users');
    // consumer.apply(UsersMiddleware).forRoutes({
    //   path: 'users',
    //   method: RequestMethod.GET,
    // });
  }
}
