import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestaurantListItem } from "../../components/restaurant-list-item/restaurant-list-item";
import { RestaurantService } from '../../services/restaurant-service';
import { RestaurantPublic } from '../../interfaces/restaurant';
import { ActivatedRoute, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { LucideAngularModule, SearchIcon } from 'lucide-angular';


@Component({
  selector: 'app-restaurants-list-page',
  imports: [RestaurantListItem, RouterModule, FormsModule, LucideAngularModule],
  templateUrl: './restaurants-list-page.html',
  styleUrl: './restaurants-list-page.scss',
})
export class RestaurantsListPage implements OnInit {
  SearchIcon = SearchIcon;

  router = inject(Router)
  route = inject(ActivatedRoute)
  restaurantsService = inject(RestaurantService)
  restaurants: RestaurantPublic[] = []
  allRestaurants: RestaurantPublic[] = []
  query = ''

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['search'] || '';
      this.search();
    });
    await this.restaurantsService.getAll();
    this.restaurants = this.restaurantsService.restaurants
    this.allRestaurants = this.restaurantsService.restaurants
  }

  search() {
    const term = this.query.trim().toLowerCase();
    if (!term) {
      this.restaurants = this.allRestaurants.slice();
      return;
    }
    this.restaurants = this.allRestaurants.filter(r =>
      r.name?.toLowerCase().includes(term) || r.description?.toLowerCase().includes(term)
    );
  }


}
