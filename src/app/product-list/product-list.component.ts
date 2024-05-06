import { Component, inject } from '@angular/core';
import { CommanService } from '../service/comman.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PlatformLocation } from '@angular/common';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, MatSelectModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  commonService = inject(CommanService)
  platformLocation = inject(PlatformLocation)

  ngOnInit() {
    this.productList()
    this.categoryList()
    this.brandList()

    history.pushState(null, '', location.href);
    this.platformLocation.onPopState(() => {
      history.pushState(null, '', location.href)
    })
  }

  productlist: any[] = []
  categorylist: any[] = []
  subcategorylist: any[] = []
  brandlist: any[] = []

  categoryId: any = null
  subcategoryId: any = null
  brandId: any = null
  search: string | null = null

  // !list the product
  productList() {
    const request = {
      "startDate": null,
      "endDate": null,
      "offset": 0,
      "limit": 10,
      "search": this.search,
      "type": null,
      "categoryId": this.categoryId,
      "subCategoryId": this.subcategoryId,
      "brandId": this.brandId,
      "modelId": null,
      "warrentyId": null,
      "userId": 1
    }
    this.commonService.productList({ data: this.commonService.encryptData(request) }).subscribe({
      next: (res: any) => {
        // console.log(res);
        const response = this.commonService.decryptData({ data: res })
        // console.log(response);
        this.productlist = response.result
        // console.log(this.productlist);

      }
    }
    )
  }

  // !search filter
  searchFilter(event: Event): void {
    this.search = (event.target as HTMLInputElement).value
    // console.log(this.search);
    this.productList()
  }

  // !list the category
  categoryList() {
    const request = {
      "search": null,
      "option": null,
      "userId": 1
    }

    this.commonService.categoryList({ data: this.commonService.encryptData(request) }).subscribe({
      next: (res: any) => {
        // console.log(res);
        const response = this.commonService.decryptData({ data: res })
        // console.log(response);
        this.categorylist = response

      }
    }
    )
  }

  filterCategory(event: any): void {
    this.categoryId = event
    this.productList()
  }

  clearCategoryFilter(): void {
    this.categoryId = null;
    this.productList()
  }

  // !list the brand
  brandList() {
    const request = {
      "brandId": 1,
      "search": null,
      "userId": 1
    }

    this.commonService.brandList({ data: this.commonService.encryptData(request) }).subscribe({
      next: (res: any) => {
        // console.log(res);
        const response = this.commonService.decryptData({ data: res })
        // console.log(response);
        this.brandlist = response

      }
    }
    )
  }

  filterBrand(event: any): void {
    this.brandId = event
    this.productList()
  }

  clearBrandFilter(): void {
    this.brandId = null;
    this.productList()
  }





  // !list the Sub-Category

  //  subcategoryList() {
  //   const request = {
  //       "categoryId":1,
  //       "search":null,    
  //       "userId":1
  //   }

  //   this.commonService.SubcategoryList({ data: this.commonService.encryptData(request) }).subscribe({
  //     next: (res: any) => {
  //       // console.log(res);
  //       const response = this.commonService.decryptData({ data: res })
  //       console.log(response);
  //       this.subcategorylist = response

  //     }
  //   }
  //   )
  // }


}
