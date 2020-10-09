import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup, NgModel, NgForm } from '@angular/forms';
import { Category } from '../view/components/category/category';

@Injectable({   
  providedIn: 'root'
})
export class CategoryService {

  readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  
  insert(category: Category)
  {
    console.log(category);
    let url = this.baseUrl + '/categories';
    return this.http.post(url, category)
    .pipe(catchError(this.errorHander))
   
  }

  getAll(): Observable<any[]>
  {
    let url = this.baseUrl + '/categories'
    return this.http.get<any[]>(url)
    .pipe(catchError(this.errorHander))
  }
  delete(id){
    let url = this.baseUrl + '/categories/' + id;
    return this.http.delete(url)
    .pipe(catchError(this.errorHander))
  }

  private errorHander(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server error")
  }
}
