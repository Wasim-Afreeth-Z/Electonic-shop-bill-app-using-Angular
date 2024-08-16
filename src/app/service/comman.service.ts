import { Injectable, inject } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AES } from 'crypto-js';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class CommanService {
// npm i crypto-js
  // encryption
  encryptData(value: any) {
    return AES.encrypt(
      JSON.stringify(value), environment.SECRETKEY
    ).toString();
  }

  // decryption
  decryptData(value: any) {
    return JSON.parse(
      AES.decrypt(value.data, environment.SECRETKEY)
        .toString(CryptoJS.enc.Utf8)
    )
  }


  http = inject(HttpClient)

  // login api call
  login(req: any): Observable<any> {
    return this.http.post('login', req);
  }

  // productlist api call
  productList(req: any): Observable<any> {
    return this.http.post('products', req)
  }

  //category list api call
  categoryList(req: any): Observable<any> {
    return this.http.post('categories/list', req)
  }

  //Subcategory list api call
  SubcategoryList(req: any): Observable<any> {
    return this.http.post('sub/categories/list', req)
  }

  //brand list api call
  brandList(req: any): Observable<any> {
    return this.http.post('brands/list', req)
  }

  //POS api call
  productPOS(req: any): Observable<any> {
    return this.http.post('product/search', req)
  }

  //customer list api call
  customerList(req: any): Observable<any> {
    return this.http.post('customers/list', req)
  }

}
