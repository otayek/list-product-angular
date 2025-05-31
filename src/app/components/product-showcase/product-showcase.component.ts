import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { ProductService } from "../../services/product.service" // <-- alterado aqui
import type { Product } from "../../models/product.interface"
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

  constructor(private productService: ProductService) {}

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
}
