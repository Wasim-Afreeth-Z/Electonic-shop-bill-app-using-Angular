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
    { path: 'productlist', component: ProductListComponent, canActivate: [canActivateGuard]},
    { path: 'pos', component: POSComponent, canActivate: [canActivateGuard] },
    { path: 'draft', component: DraftComponent, canActivate: [canActivateGuard] },
    { path: 'invoice', component: InvoiceComponent, canActivate: [canActivateGuard] },
];
// , canActivate: [canActivateGuard]