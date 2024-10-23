import { Component, inject, Input, OnInit } from '@angular/core';

import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {Button} from "primeng/button";

import { StoreService } from '../../shared/service/products.service';
import {CustomPipe} from "../../shared/pipes/dollarToRupees.pipe";
import {HeaderComponent} from "../header/header.component";
import {ProductComponent} from "../product/product.component";
import {HasRoleDirective} from "../../shared/directives/app.hasRole.directive";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone:  true,
  imports: [CustomPipe,
    FormsModule,
    Button,
    HeaderComponent,
    ProductComponent,
    RouterLink,
    HasRoleDirective,
    ConfirmDialogModule
  ]
})

export class ProductListComponent implements OnInit{
  storeService = inject(StoreService);

  searchQuery: string = '';
  @Input() deletedItemId!: number;

  ngOnInit() {
    this.storeService.fetchAllProducts().subscribe((response) => {
      this.storeService.products.set(response);
      this.storeService.filteredProducts.set(response);
    });
  }

  onSearch() {
    const filtered = this.storeService.products().filter(product =>
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.storeService.filteredProducts.set(filtered);
  }

  changeRole(){
    if(this.storeService.activeRole() === "USER"){
      this.storeService.activeRole.set("ADMIN")
    } else {
      this.storeService.activeRole.set("USER")
    }

  }

}
