import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { RestaurantService } from '../../services/restaurant-service';
import { RestaurantPublic } from '../../interfaces/restaurant';
import { ProductListItem } from "../../components/product-list-item/product-list-item";
import { CategoriesService } from '../../services/categories-service';
import { Category, CategoryWithProducts } from '../../interfaces/category';
import { HistorialService } from '../../services/historial-service';


@Component({
  selector: 'app-restaurant-menu-page',
  imports: [RouterModule, ProductListItem],
  templateUrl: './restaurant-menu-page.html',
  styleUrl: './restaurant-menu-page.scss',
})
export class RestaurantMenuPage implements OnInit {

  id: number | string | undefined
  categoryService = inject(CategoriesService)
  restaurantService = inject(RestaurantService)
  historialService = inject(HistorialService)
  restaurantBack: RestaurantPublic | undefined
  categories: Category[] | undefined 
  categoriesWithProducts: CategoryWithProducts[] = []
  router = inject(Router)
  route = inject(ActivatedRoute)
  backRequest = false

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });
    this.backRequest = true
    if (this.id) {
      await this.restaurantService.visit(this.id)
      const res = await this.restaurantService.getById(this.id)
      if (res) this.restaurantBack = res
    }
    this.backRequest = false
    
    await this.categoryService.getAll(this.id!)
    this.categories = this.categoryService.categories
    if(this.categories){
      for(const category of this.categories){
        const categoryWithProducts = await this.categoryService.getById(category.id)
        this.categoriesWithProducts?.push(categoryWithProducts!) 
      }
    }

    this.historialService.add({
    tipo: 'restaurant',
    id: this.restaurantBack!.id,
    fecha: new Date().toISOString()
  });

  }
}
