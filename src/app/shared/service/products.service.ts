import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product, NewProduct } from "../models/models";
import { Observable, of, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  activeRole = signal<"USER" | "ADMIN">("USER");

  private readonly baseUrl = "https://api.escuelajs.co/api/v1/products";
  private httpClient = inject(HttpClient);
  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  
  constructor() {}

  fetchAllProducts(): Observable<Product[]> {
    return this.getMethod<Product[]>(this.baseUrl, "Error displaying products");
  }

  fetchProductById(id: number): Observable<Product> {
    return this.getMethod<Product>(`${this.baseUrl}/${id}`, "Error getting product");
  }

  getProductById(id :number): Observable<Product> {
    return of(this.products().filter((data)=> data.id === id)[0])
  }

  createProduct(product: NewProduct): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product)
      .pipe(
        catchError(() => throwError(() => new Error("Error creating product")))
      );
  }

  updateProduct(product: NewProduct): Observable<Product> {
    return this.httpClient.put<Product>(`${this.baseUrl}/${product.categoryId}`, product)
      .pipe(
        catchError(() => throwError(() => new Error("Error updating product")))
      );
  }

  deleteProduct(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(() => throwError(() => new Error("Error deleting product")))
      );
  }

  private getMethod<T>(url: string, errorMessage: string): Observable<T> {
    return this.httpClient.get<T>(url).pipe(
      catchError(() => throwError(() => new Error(errorMessage)))
    );
  }
}
