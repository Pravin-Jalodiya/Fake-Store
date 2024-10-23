import { Component,input, inject, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router'

import {ConfirmationService, PrimeTemplate} from 'primeng/api';

import { StoreService } from '../../shared/service/products.service';
import { CONFIRMATION_DIALOG, CONFIRMATION_HEADER } from '../../shared/config/app.constants';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {CustomPipe} from "../../shared/pipes/dollarToRupees.pipe";
import {HasRoleDirective} from "../../shared/directives/app.hasRole.directive";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  imports: [
    Button,
    PrimeTemplate,
    CardModule,
    CustomPipe,
    HasRoleDirective
  ],
  standalone: true
})

export class ProductComponent {

  confirmationService = inject(ConfirmationService);
  service = inject(StoreService)
  router = inject(Router)

  title = input.required<string>();
  price = input.required<number>();
  image = input.required<string>();
  productId = input.required<number>();

  onDelete(){
    if(this.service.activeRole() === "ADMIN"){
    this.confirmationService.confirm({
      message: CONFIRMATION_DIALOG,
      header: CONFIRMATION_HEADER,
      accept: () => {
        const updatedProducts = this.service.products().filter(product =>
          product.id !== this.productId()
        );
        this.service.products.set(updatedProducts);
        this.service.filteredProducts.set(updatedProducts);
        this.service.deleteProduct(this.productId()).subscribe({
          next: () => {
            console.log('Product deleted successfully');
          },
          error: (error) => console.error(error)
        });
      },
      reject: () => {
      }
    });
  }
}
  onEdit() {
     this.router.navigate(['/update', this.productId()])
  }
}
