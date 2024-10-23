import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StoreService } from '../../shared/service/products.service';
import { NewProduct, Product } from '../../shared/models/models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})

export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  productToEdit: Product | null = null;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      categoryId: [1, Validators.required],
      images: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productForm.get('categoryId')?.disable();
      this.productForm.get('description')?.disable();
      this.productForm.get('images')?.disable();
      this.service.getProductById(+id).subscribe(product => {
        this.productToEdit = product;
        this.productForm.patchValue({
          title: product.title,
          price: product.price,
          description: product.description,
          categoryId: product.id,
          images: product.images
        });
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }

    const formValue = this.productForm.value;
    const imagesArray = formValue.images?.split(',').map((url: string) => url.trim());

    const productDataAdd: NewProduct = {
      categoryId: this.productToEdit ? this.productToEdit.category : formValue.categoryId,
      title: formValue.title,
      price: formValue.price,
      description: formValue.description,
      images: imagesArray
    };

    const productDataEdit: NewProduct = {
      title: formValue.title,
      price: formValue.price,
    };

    if (this.productToEdit) {
      productDataEdit.categoryId = this.productToEdit.id;
      this.service.updateProduct(productDataEdit).subscribe(() => this.router.navigate(['/home']));
    } else {
      this.service.createProduct(productDataAdd).subscribe(() => this.router.navigate(['/home']));
    }
  }

  clearError(field: string) {
    if (this.productForm.get(field)?.invalid) {
      this.productForm.get(field)?.markAsPristine();
    }
  }
}
