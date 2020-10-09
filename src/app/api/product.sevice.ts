import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Product } from '../view/components/product/product';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  readonly baseUrl = environment.baseUrl;
  product: Product;

  insert(formData: FormData) {
    let url = this.baseUrl + '/product';
    console.log(formData);
    return this.http.post<any>(url, formData).pipe(catchError(this.errorHander));
  }

  ListProductByCategoryId(id: number) {
    // '?PageNumber=' + pageNumber + '&PageSize=' + pageSize
    let url = this.baseUrl + '/product/ListProductByCategoryId/' + id ;
    return this.http.get<any[]>(url).pipe(catchError(this.errorHander));
  }

  update(id: number, formData: FormData){
    let url = this.baseUrl + '/product/' + id;

    console.log('formData', formData)
    return this.http.put(url, formData).pipe(catchError(this.errorHander));
  }

  getById(id: number){
    let url = this.baseUrl + '/product/GetById/' + id;
    return this.http.get<any[]>(url).pipe(catchError(this.errorHander));
  }

  delete(id: number){
    let url = this.baseUrl + '/product/' + id;
    return this.http.delete(url).pipe(catchError(this.errorHander));
  }

  private errorHander(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(error.message || 'Server error');
  }
}
