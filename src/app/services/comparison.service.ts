import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import type { Product } from "../models/product.interface"

@Injectable({
  providedIn: "root",
})
export class ComparisonService {
  private maxProducts = 4
  private comparisonProducts = new BehaviorSubject<Product[]>([])

  comparisonProducts$ = this.comparisonProducts.asObservable()

  addToComparison(product: Product): boolean {
    const currentProducts = this.comparisonProducts.value

    console.log("Tentando adicionar produto:", product.title)
    console.log("Produtos atuais:", currentProducts.length)

    // Verificar se já existe
    if (currentProducts.find((p) => p.id === product.id)) {
      console.log("Produto já existe na comparação")
      return false
    }

    // Verificar limite máximo
    if (currentProducts.length >= this.maxProducts) {
      console.log("Limite máximo atingido")
      return false
    }

    const updatedProducts = [...currentProducts, product]
    this.comparisonProducts.next(updatedProducts)
    console.log("Produto adicionado! Total:", updatedProducts.length)
    return true
  }

  removeFromComparison(productId: number): void {
    const currentProducts = this.comparisonProducts.value
    const updatedProducts = currentProducts.filter((p) => p.id !== productId)
    this.comparisonProducts.next(updatedProducts)
    console.log("Produto removido! Total:", updatedProducts.length)
  }

  clearComparison(): void {
    this.comparisonProducts.next([])
    console.log("Comparação limpa!")
  }

  isInComparison(productId: number): boolean {
    const isIn = this.comparisonProducts.value.some((p) => p.id === productId)
    return isIn
  }

  getComparisonCount(): number {
    return this.comparisonProducts.value.length
  }

  canAddMore(): boolean {
    return this.comparisonProducts.value.length < this.maxProducts
  }
}
