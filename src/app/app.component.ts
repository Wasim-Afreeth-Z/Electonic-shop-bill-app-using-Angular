import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { POSComponent } from './pos/pos.component';
import { DraftComponent } from './draft/draft.component';
import { InvoiceComponent } from './invoice/invoice.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,ProductListComponent,POSComponent,DraftComponent,InvoiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Electronic-Shop-Payment-Project';
}
