import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { APIs } from 'src/app/services/api';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product?: Product

  /** Subject that stops all hot observables */
  private _destroy$ = new Subject<void>()

  constructor(
    public activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.productDetails()
  }

  productDetails() {
    this.activatedRoute.params
      .pipe(
        switchMap((params) =>
          this.httpService.get<Product>(APIs({ Product_ID: params.id }).productDetails)
        ),
        takeUntil(this._destroy$)
      )
      .subscribe((product: Product) => {
        this.product = product
      })
  }

  ngOnDestroy() {
    this._destroy$.next()
    this._destroy$.complete()
  }

}
