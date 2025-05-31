import { Component, type OnInit, type OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import type { Product } from "../../models/product.interface"
import { Subscription } from "rxjs"
import { ComparisonService } from "../../services/comparison.service"

@Component({
  selector: "app-product-comparison",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./product-comparison.component.html",
  styleUrls: ["./product-comparison.component.css"],
})
export class ProductComparisonComponent implements OnInit, OnDestroy {
  products: Product[] = []
  isVisible = false
  private subscription = new Subscription()

  constructor(private comparisonService: ComparisonService) {
    console.log("ProductComparisonComponent construído")
  }

  ngOnInit(): void {
    console.log("ProductComparisonComponent inicializado")

    this.subscription.add(
      this.comparisonService.comparisonProducts$.subscribe((products) => {
        console.log("Produtos na comparação atualizados:", products.length)
        this.products = products
        this.isVisible = products.length > 0
      }),
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  removeProduct(productId: number): void {
    this.comparisonService.removeFromComparison(productId)
  }

  clearAll(): void {
    this.comparisonService.clearComparison()
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  getStarArray(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < Math.round(rating) ? 1 : 0))
  }

  getBestPrice(): number {
    if (this.products.length === 0) return 0
    return Math.min(...this.products.map((p) => p.price))
  }

  getBestRating(): number {
    if (this.products.length === 0) return 0
    return Math.max(...this.products.map((p) => p.rating.rate))
  }

  isBestPrice(price: number): boolean {
    return price === this.getBestPrice()
  }

  isBestRating(rating: number): boolean {
    return rating === this.getBestRating()
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible
  }

  trackByProductId(index: number, product: Product): number {
    return product.id
  }
}
