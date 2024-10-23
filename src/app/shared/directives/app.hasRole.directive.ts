import { Directive, Input, TemplateRef, ViewContainerRef, inject, OnInit, OnChanges, DoCheck, computed } from '@angular/core';
import { StoreService } from '../service/products.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, DoCheck {
  private hasView = false;
  private productService = inject(StoreService);

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.updateView(this.productService.activeRole());
  }

  ngDoCheck() {
    this.updateView(this.productService.activeRole());
  }

  private updateView(activeRole: string) {
    const userRole = this.productService.activeRole();
    if (userRole === "ADMIN" && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (userRole !== "ADMIN" && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
