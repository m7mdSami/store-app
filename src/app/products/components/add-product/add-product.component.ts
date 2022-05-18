import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIs } from 'src/app/services/api';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  form: FormGroup = this.fb.group({
    title: ['', { validators: [Validators.required] }],
    price: ['', { validators: [Validators.required] }],
    description: ['', { validators: [Validators.required] }],
    image: ['', { validators: [Validators.required] }],
    category: ['', { validators: [Validators.required] }]
  })

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  addProduct() {
    let body = {
      ...this.form.value
    }

    this.httpService.post(APIs().products, body)
      .subscribe(res => {
        this._snackBar.open(`Product Added Successfully`);
      })
  }

}
