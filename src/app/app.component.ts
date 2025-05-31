import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProductShowcaseComponent } from "./components/product-showcase/product-showcase.component"
import { ProductComparisonComponent } from "./components/product-comparison/product-comparison.component"


@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, ProductShowcaseComponent, ProductComparisonComponent],
  template: `
    <div class="app">
      <app-product-showcase></app-product-showcase>
      <app-product-comparison></app-product-comparison>
    </div>
  `,
  styles: [
    `
    .app {
      min-height: 100vh;
      background-color: #f8f9fa;
    }
  `,
  ],
})
export class AppComponent {
  title = "angular-product-showcase"
}
