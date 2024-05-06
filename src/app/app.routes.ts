import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { POSComponent } from './pos/pos.component';
import { canActivateGuard } from './guard/can-activate.guard';
import { DraftComponent } from './draft/draft.component';
import { InvoiceComponent } from './invoice/invoice.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'productlist', component: ProductListComponent },
    { path: 'pos', component: POSComponent },
    { path: 'draft', component: DraftComponent },
    { path: 'invoice', component: InvoiceComponent },
];
// , canActivate: [canActivateGuard]