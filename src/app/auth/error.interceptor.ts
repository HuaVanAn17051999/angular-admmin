import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrordialogService } from '../error-dialog/errordialog.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public errorDialogService: ErrordialogService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      // retry(1),
      // catchError((error: HttpErrorResponse) => {
      //   let errorMessage = '';
      //   if (error.error instanceof ErrorEvent) {  
      //     // client-side error
      //     errorMessage = `Error: ${error.error.message}`;
      //   }else {
      //     // server-side error
      //     errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
       
      //  }
      //  console.log('error' + errorMessage);
      //  return throwError(errorMessage);
      // })
      map((event: HttpEvent<any>) => {
        if(event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('reee', error);
        // if(error && error.status === 401) {
        //   this.router.navigate(['/login'])
        // }
      
        
          let data = {};
          data = {
              reason: error && error.error && error.error.reason ? error.error.reason : 'Url not supported',
              status: error.status
          };
          this.errorDialogService.openDialog(data);
          return throwError(error);
        
     
    }));
  }
}
