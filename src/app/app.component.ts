import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ProductShowcaseComponent } from "./components/product-showcase/product-showcase.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, ProductShowcaseComponent],
  template: `
    <div class="app">
      <app-product-showcase></app-product-showcase>
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
