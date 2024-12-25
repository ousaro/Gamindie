import { HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../core/services/token/token.service';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.includes("/auth")){
    return next(req);
  }
  const tokenService = inject(TokenService); // Inject your token service
  const token:string = tokenService.token;
  if(token){
    const authReq:HttpRequest<any> = req.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
    return next(authReq);  
  }
  
  return next(req);
};
