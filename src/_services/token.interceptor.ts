import { HttpInterceptorFn } from '@angular/common/http';
import { switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return authService.getToken().pipe(
    take(1), 
    switchMap((token) => {
      console.log('Interceptor received token:', token);
      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(authReq);
      } else {
        return next(req); 
      }
    })
  );
};
