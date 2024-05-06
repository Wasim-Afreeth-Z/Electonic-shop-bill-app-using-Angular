import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [FormsModule, CommonModule,MatSnackBarModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  route = inject(Router)
  snackBar = inject(MatSnackBar)

  invoices: any[] = []

  ngOnInit(): void {
    this.invoices = JSON.parse(localStorage.getItem('invoice')!) || []
  }

  eachProductPrice(invoice: any) {
   return invoice.sellingPrice * invoice.q
  }

  subTotal() {
    return this.invoices.reduce((acc, item) => {
      return acc + item.sellingPrice * item.q
    }, 0)
  }

  tax() {
    return this.subTotal() * 0.18
  }

  total() {
    return this.subTotal() + this.tax()
  }

  back(): void {
    localStorage.removeItem('invoice')
    this.route.navigateByUrl('pos')
  }

  printRecipt():void{
    localStorage.removeItem('cart')
    localStorage.removeItem('invoice')
    this.route.navigateByUrl('pos')
    this.snackBar.open('Recipt is Printing', 'Success', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    })
  }

  cancel():void{
    localStorage.removeItem('invoice')
    this.route.navigateByUrl('pos')
    this.snackBar.open('Order was Canceled', 'Failed', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000
    })

  }
}
