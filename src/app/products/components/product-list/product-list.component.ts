import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { APIs } from 'src/app/services/api';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

   /** Subject that stops all hot observables */
   private _destroy$ = new Subject<void>()

  products?: Product[]
  limit: number = 10

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getProductList()
  }

  getProductList() {
    let queryParam = {
      limit: this.limit
    }

    this.httpService.get<Product[]>(APIs().products, queryParam)
      .pipe(takeUntil(this._destroy$)) 
      .subscribe((products: Product[]) => {
        this.products = products
      })
  }

  ngOnDestroy() {
    this._destroy$.next()
    this._destroy$.complete()
  }
}
