import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  readonly baseUrl = environment.baseUrl;

  constructor(private  http: HttpClient) { }

  listRole() : Observable<any[]>{
    let url  = this.baseUrl + "/Role";
    console.log('url', url)
    return this.http.get<any>(url);
  }
}
