import { Component } from '@angular/core';

import {ConfirmationService, PrimeNGConfig} from 'primeng/api';
import {HeaderComponent} from "./components/header/header.component";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductComponent} from "./components/product/product.component";
import {ProductFormComponent} from "./components/product-form/product-form.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {provideRouter, RouterModule, RouterOutlet} from "@angular/router";
import {CardModule} from "primeng/card";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CustomPipe} from "./shared/pipes/dollarToRupees.pipe";
import {HasRoleDirective} from "./shared/directives/app.hasRole.directive";
import {provideHttpClient} from "@angular/common/http";
import {routes} from "./app-routing.module";
import {StoreService} from "./shared/service/products.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet],
  providers: [ConfirmationService, StoreService]
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.ripple = true;
  }
}
