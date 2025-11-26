import { Component, inject } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CategoriesService } from '../../services/categories-service';
import { ProductsService } from '../../services/products-service';
import { ProductListItem } from '../product-list-item/product-list-item';
import { LucideAngularModule, ChevronLeftIcon } from 'lucide-angular';

@Component({
  selector: 'app-add-product-to-category-card',
  imports: [RouterModule, ProductListItem, LucideAngularModule],
  templateUrl: './add-product-to-category-card.html',
  styleUrl: './add-product-to-category-card.scss',
})
export class AddProductToCategoryCard {
  backIcon = ChevronLeftIcon;

  categoryService = inject(CategoriesService)
  productService = inject(ProductsService)
  products: Product[] = []
  productsToAdd: Product[] = []
  router = inject(Router);
  route = inject(ActivatedRoute);
  id: string | null = null;
  categoryId: number | string | undefined;

  async ngOnInit() {
    document.body.classList.add('overflow-hidden');
    this.route.parent?.params.subscribe(params => {
      this.id = params['id']
    })
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId']
    })

    await this.productService.getAll(this.id!)
    this.products = this.productService.products
    if (this.products) {
      for (const product of this.products) {
        const productWithCategories = await this.productService.getById(product.id)
        if (!productWithCategories!.categoryIds.includes(Number(this.categoryId!))) {
          this.productsToAdd.push(productWithCategories!)
        }
      }
    }


  }


  close() {
    document.body.classList.remove('overflow-hidden');
    this.router.navigate(['my-restaurant/' + this.id + "/menu"])
  }

    async addProduct(productId: number | string){
    await this.productService.addProductToCategory(productId, this.categoryId!)
    this.close()
}
}
