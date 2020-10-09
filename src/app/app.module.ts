import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { DefaultModule } from './layout/default/default.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { LoginComponent } from './view/components/user/login/login.component';


import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { ErrorInterceptor } from './auth/error.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrordialogService } from './error-dialog/errordialog.service';
import { ErrordialogComponent } from './view/components/errordialog/errordialog.component';




export function tokenGetter() {
  return localStorage.getItem("token");
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    AuthGuard, AuthInterceptor, ErrordialogService
  ],
  entryComponents: [ErrordialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
