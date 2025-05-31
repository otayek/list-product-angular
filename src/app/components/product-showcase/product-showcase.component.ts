import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

import type { Product } from "../../models/product.interface"
import { ProductService } from "../../services/product.service"
import { ComparisonService } from "../../services/comparison.service"

@Component({
  selector: "app-product-showcase",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./product-showcase.component.html",
  styleUrls: ["./product-showcase.component.css"],
})
export class ProductShowcaseComponent implements OnInit {
  products: Product[] = []
  filteredProducts: Product[] = []
  categories: string[] = []
  selectedCategory = ""
  searchTerm = ""
  loading = false
  error = ""

  constructor(
    private productService: ProductService,
    private comparisonService: ComparisonService,
  ) {
    console.log("ProductShowcaseComponent construído")
    console.log("ComparisonService:", this.comparisonService)
  }

  ngOnInit(): void {
    this.loadProducts()
    this.loadCategories()
  }

  loadProducts(): void {
    this.loading = true
    this.error = ""

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products
        this.filteredProducts = products
        this.loading = false
        console.log("Produtos carregados:", products.length)
      },
      error: (error) => {
        this.error = "Erro ao carregar produtos. Tente novamente."
        this.loading = false
        console.error("Erro:", error)
      },
    })
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories
      },
      error: (error) => {
        console.error("Erro ao carregar categorias:", error)
      },
    })
  }

  filterProducts(): void {
    let filtered = this.products

    // Filtrar por categoria
    if (this.selectedCategory) {
      filtered = filtered.filter((product) => product.category === this.selectedCategory)
    }

    // Filtrar por termo de busca
    if (this.searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(this.searchTerm.toLowerCase()),
      )
    }

    this.filteredProducts = filtered
  }

  onCategoryChange(): void {
    this.filterProducts()
  }

  onSearchChange(): void {
    this.filterProducts()
  }

  clearFilters(): void {
    this.selectedCategory = ""
    this.searchTerm = ""
    this.filteredProducts = this.products
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

  addToComparison(product: Product): void {
    console.log("Clique no botão comparar para produto:", product.title)

    if (!this.comparisonService) {
      console.error("ComparisonService não está disponível!")
      return
    }

    const success = this.comparisonService.addToComparison(product)

    if (!success) {
      if (this.comparisonService.isInComparison(product.id)) {
        alert("Este produto já está na comparação!")
      } else {
        alert("Máximo de 4 produtos para comparação!")
      }
    } else {
      console.log("Produto adicionado com sucesso à comparação!")
    }
  }

  removeFromComparison(product: Product): void {
    console.log("Removendo produto da comparação:", product.title)
    this.comparisonService.removeFromComparison(product.id)
  }

  isInComparison(productId: number): boolean {
    if (!this.comparisonService) {
      return false
    }
    return this.comparisonService.isInComparison(productId)
  }

  canAddToComparison(): boolean {
    if (!this.comparisonService) {
      return false
    }
    return this.comparisonService.getComparisonCount() < 4
  }

  trackByProductId(index: number, product: Product): number {
    return product.id
  }
}
