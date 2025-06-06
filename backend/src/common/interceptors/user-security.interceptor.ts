import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class StripUserSecretsInterCeptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((res) => {
        delete res.password;
        return res;
      }),
    );
  }
}
