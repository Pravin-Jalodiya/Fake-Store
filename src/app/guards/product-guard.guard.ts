import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { StoreService } from '../shared/service/products.service';
 
 
export const productGuard: CanActivateFn = (route : ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router = inject(Router);
  const productService = inject(StoreService);
 
  if (productService.activeRole() === "USER") {
    console.log("guard")
    return router.navigate(['/']);
  } else {
    console.log("guard")
    return true;
  }
}