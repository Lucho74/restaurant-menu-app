import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { Category, CategoryWithProducts } from '../../interfaces/category';
import { RestaurantPublic } from '../../interfaces/restaurant';
import { CategoriesService } from '../../services/categories-service';
import { HistorialService } from '../../services/historial-service';
import { RestaurantService } from '../../services/restaurant-service';
import { ProductListItem } from '../../components/product-list-item/product-list-item';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products-service';
import { NewEditProductCard } from "../../components/new-edit-product-card/new-edit-product-card";
import { filter } from 'rxjs';
import { LucideAngularModule, PlusIcon, MinusIcon, ChevronLeftIcon, AlertCircle, EditIcon, Clock, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-edit-menu-page',
  imports: [RouterModule, ProductListItem, NewEditProductCard, LucideAngularModule],
  templateUrl: './edit-menu-page.html',
  styleUrl: './edit-menu-page.scss',
})
export class EditMenuPage implements OnInit {
  MinusIcon = MinusIcon;
  PlusIcon = PlusIcon;
  BackIcon = ChevronLeftIcon;
  AlertCircleIcon = AlertCircle;
  EditIcon = EditIcon;
  ClockIcon = Clock;
  TrashIcon = Trash2;

  id: number | string | undefined
  categoryService = inject(CategoriesService)
  restaurantService = inject(RestaurantService)
  productService = inject(ProductsService)
  restaurantBack: RestaurantPublic | undefined
  categories: Category[] | undefined
  categoriesWithProducts: CategoryWithProducts[] = []
  products: Product[] = []
  productsWithoutCategory: Product[] = []
  router = inject(Router)
  route = inject(ActivatedRoute)
  isLoading = false

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Solo recargar si la URL es exactamente la página de menú (sin rutas hijas)
        const url = event.url || event.urlAfterRedirects;
        if (url && url.match(/^\/my-restaurant\/\d+\/menu\/?$/)) {
          this.loadData();
        }
      });

    this.loadData();


  }

  async loadData() {
    this.isLoading = true
    if (this.id) {
      await this.restaurantService.visit(this.id)
      const res = await this.restaurantService.getById(this.id)
      if (res) this.restaurantBack = res
    }


    await this.categoryService.getAll(this.id!)
    this.categories = this.categoryService.categories

    this.categoriesWithProducts = [];
    this.productsWithoutCategory = [];

    if (this.categories) {
      for (const category of this.categories) {
        const categoryWithProducts = await this.categoryService.getById(category.id)
        this.categoriesWithProducts?.push(categoryWithProducts!)
      }
    }

    await this.productService.getAll(this.id!)
    this.products = this.productService.products
    if (this.products) {
      for (const product of this.products) {
        const productWithCategories = await this.productService.getById(product.id)
        if (productWithCategories!.categoryIds.length == 0) {
          this.productsWithoutCategory.push(productWithCategories!)
        }
      }
      console.log(this.productsWithoutCategory);
    }
    this.isLoading = false
  }


  async deleteCategory(category: CategoryWithProducts) {
      this.isLoading = true;
      for (const productId of category.productIds) {
        await this.productService.deleteProductFromCategory(productId, category.id);
      }
      await this.categoryService.delete(category.id);
      this.loadData();
  }

  back() {
    this.router.navigate(['my-restaurant/' + this.id ])
  }

}
