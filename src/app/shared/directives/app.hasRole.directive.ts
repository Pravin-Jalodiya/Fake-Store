import { Directive, Input, TemplateRef, ViewContainerRef, inject, OnInit, OnChanges } from '@angular/core';
import { StoreService } from '../service/products.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnChanges {
  private hasView = false;
  private productService = inject(StoreService);

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appHasRole(role: string) {
    this.updateView(role);
  }

  ngOnInit() {
    this.updateView(this.productService.activeRole());
  }

  ngOnChanges() {
    this.updateView(this.productService.activeRole());
  }

  private updateView(activeRole: string) {
    const userRole = this.productService.activeRole();
    if (userRole === 'ADMIN' && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (userRole !== 'ADMIN' && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
