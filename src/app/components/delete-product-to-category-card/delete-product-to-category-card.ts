import { Component, inject } from '@angular/core';
import { ProductListItem } from '../product-list-item/product-list-item';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChevronLeftIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-delete-product-to-category-card',
  imports: [ProductListItem, LucideAngularModule],
  templateUrl: './delete-product-to-category-card.html',
  styleUrl: './delete-product-to-category-card.scss',
})
export class DeleteProductToCategoryCard {
  backIcon = ChevronLeftIcon;

  productService = inject(ProductsService)
  productsToDelete: Product[] = []
  router = inject(Router);
  route = inject(ActivatedRoute);
  categoryId: number | string | undefined;
  id: string | number | undefined

  async ngOnInit() {
    document.body.classList.add('overflow-hidden');
    this.route.parent?.params.subscribe(params => {
      this.id = params['id']
    })
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId']
    })

    await this.productService.getAllByCategory(this.categoryId!)
    this.productsToDelete = this.productService.products
  }


  close() {
    document.body.classList.remove('overflow-hidden');
    this.router.navigate(['my-restaurant/' + this.id + "/menu"])
  }

  async deleteProduct (productId: number | string) {
    await this.productService.deleteProductFromCategory(productId, this.categoryId!)
    this.close()
  }
}
