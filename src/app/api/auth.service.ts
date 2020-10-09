import { HttpClient,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: any;
  public bearerToken: any;

  helper = new JwtHelperService();

  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) { 

     this.getToken();
     console.log('token', this.token);
  }

  login(data): Observable<any> {
    let url = "https://localhost:5001/token";
    return this.http.post<any>(url,data);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
    // Check whether the token is expired and return
    // true or false
  }
  getToken(){
    const token = JSON.parse(localStorage.getItem('token'));
    if(token !== null) {
      this.bearerToken = token.AccessToken;
     
      return this.token = this.helper.decodeToken(token['AccessToken']);
    }
    return null;

 }
}
