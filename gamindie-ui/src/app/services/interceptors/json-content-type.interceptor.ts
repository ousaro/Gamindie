import {
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { catchError, mergeMap, Observable, throwError, of } from 'rxjs';
import { from } from 'rxjs';

// Convert to function-based interceptor
export const JsonContentTypeInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  return next(req).pipe(
    // Handle successful responses
    mergeMap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.body instanceof Blob && event.body.type === 'application/json') {
        // Convert Blob to JSON
        return from(
          new Promise<HttpEvent<any>>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e: Event) => {
              try {
                const body = JSON.parse((e.target as FileReader).result as string);
                const modifiedResponse = event.clone({ body });
                resolve(modifiedResponse);
              } catch (e) {
                reject(e);
              }
            };
            reader.onerror = () => reject(event);
            reader.readAsText(event.body);
          })
        );
      }
      return of(event); // Emit the unmodified event as an Observable
    }),
    // Handle errors
    catchError(err => {
      if (err instanceof HttpErrorResponse && err.error instanceof Blob && err.error.type === 'application/json') {
        return from(
          new Promise<never>((_, reject) => {
            const reader = new FileReader();
            reader.onload = (e: Event) => {
              try {
                const errmsg = JSON.parse((e.target as FileReader).result as string);
                reject(
                  new HttpErrorResponse({
                    error: errmsg,
                    headers: err.headers,
                    status: err.status,
                    statusText: err.statusText,
                    url: err.url ?? undefined,
                  })
                );
              } catch (e) {
                reject(err);
              }
            };
            reader.onerror = () => reject(err);
            reader.readAsText(err.error);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
