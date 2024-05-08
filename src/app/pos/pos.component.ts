import { Component, inject, model } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommanService } from '../service/comman.service';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [SideBarComponent, FormsModule, MatSelectModule, CommonModule, MatSidenavModule, MatSnackBarModule],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.scss'
})
export class POSComponent {

  commonService = inject(CommanService)
  route = inject(Router)
  snackBar = inject(MatSnackBar)
  activateroute = inject(ActivatedRoute)

  ngOnInit() {
    this.productPOS()
    this.categoryList()
    this.customerList()
    // this.cart = JSON.parse(localStorage.getItem('cart')!) || []

    this.draftStorage = history.state
    // console.log(this.draftStorage);

    if (this.draftStorage.drafts != undefined) {
      this.cart = this.draftStorage.drafts?.draft
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
    this.customername = this.draftStorage.drafts?.customerName
    this.customerid = this.draftStorage.drafts?.customerId;

    // this.customername = JSON.parse(localStorage.getItem('customername')!)
    // this.customerid = JSON.parse(localStorage.getItem('customerid')!)
    // console.log(this.customername);

    // this.draftStorage = history.state.drafts
    // // console.log(this.draftStorage);
    // if (this.draftStorage != null) {
    //   this.cart.push(this.draftStorage)
    //   localStorage.setItem('cart', JSON.stringify(this.cart))
    // }
  }

  productpos: any[] = []
  categorylist: any[] = []
  customerlist: any[] = []
  cart: any[] = []
  draftStorage: any;
  customername: string | null = null
  customerid: string | null = null

  categoryId: any = null
  search: string | null = null

  // !productPOS list
  productPOS(): void {
    const request = {
      "search": this.search,
      "categoryId": this.categoryId,
      "subCategoryId": null,
      "type": null,
      "brandId": null,
      "modelId": null,
      "warrentyId": null,
      "offset": 0,
      "limit": 10,
      "storeId": 1,
      "userId": 1
    }

    this.commonService.productPOS({ data: this.commonService.encryptData(request) }).subscribe({
      next: (res: any) => {
        // console.log(res);
        const response = this.commonService.decryptData({ data: res })
        // console.log(response);
        this.productpos = response.result
        // console.log(this.productpos);

      }
    }
    )
  }

  //! list the category
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

  filterCategory(category: string): void {
    this.categoryId = category
    this.productPOS()
  }

  clearCategoryFilter(): void {
    this.categoryId = null;
    this.productPOS()
  }

  // !search filter
  searchFilter(event: Event): void {
    this.search = (event.target as HTMLInputElement).value
    // console.log(this.search);
    this.productPOS()
  }

  //!customer list
  customerList(): void {
    const request = {
      "search": null,
      "storeId": null,
      "customerTypeId": 1,
      "userId": 1
    }

    this.commonService.customerList({ data: this.commonService.encryptData(request) }).subscribe({
      next: (res: any) => {
        // console.log(res);
        const response = this.commonService.decryptData({ data: res })
        // console.log(response);
        this.customerlist = response
        // console.log(this.customerlist);

      }
    }
    )
  }

  customerlist2: string[] = ['Wasim Afreeth', 'Abdul', 'Farvez']


  // !add to cart
  addtoCart(product: any): void {
    const index = this.cart.findIndex(item => item.productId === product.productId);  
    if (index !== -1) {
      if (this.cart[index].q < 10) {
        this.cart[index].q++;
      }
    } else {
      product.q = 1;
      this.cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart))

  }

  minus(index: any): void {
    this.cart[index].q--
  }

  plus(index: any): void {
    this.cart[index].q++
  }

  removeCart(index: number) {
    this.cart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  removeAllCart() {
    this.cart = []
    this.customername = null
    this.customerid = null
    localStorage.removeItem('cart')
  }

  // !calculation
  subTotal() {
    if (this.cart != undefined || this.cart != null) {
      return this.cart.reduce((acc, product) => {
        return acc + product.sellingPrice * product.q
      }, 0)
    }
  }

  tax() {
    return this.subTotal() * 0.18
  }

  total() {
    return this.subTotal() + this.tax()
  }

  // !draft

  holdOrder() {
    if (this.customername == null || this.customername == undefined || this.customerid == null || this.customerid == undefined) {
      this.snackBar.open('Enter Customer Feild', '!!!', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })
    } else {
      const drafts = JSON.parse(localStorage.getItem('draft')!) || [];
      const draft = {
        customerId: this.customerid,
        customerName: this.customername,
        draft: this.cart
      }

      drafts.push(draft);
      localStorage.setItem('draft', JSON.stringify(drafts));
      localStorage.removeItem('cart')
      localStorage.removeItem('customername')
      localStorage.removeItem('customerid')
      this.route.navigateByUrl('draft')
      this.snackBar.open('Order was Holded', 'Hold!', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })
    }

    // localStorage.setItem('draft', JSON.stringify(this.cart));
    // localStorage.removeItem('cart')
    // this.route.navigateByUrl('draft')
  }


  proceed(): void {
    if (this.customername == null || this.customername == undefined || this.customerid == null || this.customerid == undefined) {
      this.snackBar.open('Enter Customer Name', '!!!', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000
      })
    } else {
      localStorage.setItem('invoice', JSON.stringify(this.cart))
      localStorage.setItem('customername', JSON.stringify(this.customername))
      localStorage.setItem('customerid', JSON.stringify(this.customerid))
      localStorage.removeItem('cart')
      this.route.navigateByUrl('invoice')
    }
  }




























  // icons: { icon: string}[] = [
  //   { icon: 'fa-regular fa-lightbulb'},
  //   { icon: 'fa-sharp fa-regular fa-lamp-desk'},
  //   { icon: 'fa-regular fa-light-ceiling'},
  // ]

  //! mobile view height cart
  // height: string = '150px'
  arrowIcon: string = "fa-solid fa-angle-up"
  heightValue: boolean = true;

  cartheight() {
    this.heightValue = !this.heightValue
    // this.height = !this.heightValue ? '400px' : '150px';
    this.arrowIcon = !this.heightValue ? "fa-solid fa-angle-down" : "fa-solid fa-angle-up"
  }



}
