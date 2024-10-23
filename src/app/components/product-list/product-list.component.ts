import { Component, inject, Input, OnInit } from '@angular/core';

import { StoreService } from '../../shared/service/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
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
