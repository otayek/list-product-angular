import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http" // <-- alterado aqui
import type { Observable } from "rxjs"
import type { Product } from "../models/product.interface"
// ...existing code...

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "https://fakestoreapi.com/products"

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`)
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`)
  }
}
