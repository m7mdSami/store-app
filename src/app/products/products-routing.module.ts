import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/product-list',
    pathMatch: 'full'
  },
  {
    path: 'product-list',
    component: ProductListComponent,
  },
  {
    path: 'product-list/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
