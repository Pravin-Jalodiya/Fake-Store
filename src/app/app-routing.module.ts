import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { productGuard } from './guards/product.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ProductListComponent },
  { path: 'add', component: ProductFormComponent, canActivate: [productGuard] },
  { path: 'update/:id', component: ProductFormComponent, canActivate: [productGuard] }
];
