import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product, ProductWithCategories } from '../../interfaces/product';
import { ProductsService } from '../../services/products-service';
import { CategoriesService } from '../../services/categories-service';
import { ChevronLeftIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-product-details-card',
  imports: [LucideAngularModule],
  templateUrl: './product-details-card.html',
  styleUrl: './product-details-card.scss',
})
export class ProductDetailsCard implements OnInit {
  backIcon = ChevronLeftIcon;

  productId: number | string | undefined
  productsService = inject(ProductsService)
  categoriesService = inject(CategoriesService)
  product: ProductWithCategories | undefined
  productCategories: string[] = []
  router = inject(Router)
  route = inject(ActivatedRoute)
  backRequest = false

  async ngOnInit() {
    document.body.classList.add('overflow-hidden');
    this.route.params.subscribe(params => {
      this.productId = params['productId']
    });
    this.backRequest = true
    if (this.productId) {
      const res = await this.productsService.getById(this.productId)
      if (res) {
        this.product = res
        if (this.product.categoryIds) {
          for (const categoryId of this.product.categoryIds) {
            const category = await this.categoriesService.getById(categoryId)
            const categoryName = category!.name
            this.productCategories.push(categoryName)
          }
        }
      }
    }
    this.backRequest = false
  }


  close() {
    document.body.classList.remove('overflow-hidden');
    this.router.navigate(['restaurants/' + this.product!.restaurantId])
  }
}
