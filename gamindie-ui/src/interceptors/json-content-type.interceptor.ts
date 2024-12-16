import { HttpRequest, HttpEvent, HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

// Convert to function-based interceptor
export const JsonContentTypeInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  return next(req).pipe(
    catchError(err => {
      if (err instanceof HttpErrorResponse && err.error instanceof Blob && err.error.type === 'application/json') {
        return new Promise<any>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e: Event) => {
            try {
              const errmsg = JSON.parse((e.target as FileReader).result as string);
              reject(new HttpErrorResponse({
                error: errmsg,
                headers: err.headers,
                status: err.status,
                statusText: err.statusText,
                url: err.url ?? undefined
              }));
            } catch (e) {
              reject(err);
            }
          };
          reader.onerror = () => reject(err);
          reader.readAsText(err.error);
        });
      }
      return throwError(() => err);
    })
  );
};
