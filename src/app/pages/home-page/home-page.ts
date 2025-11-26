import { Component, inject, OnInit } from '@angular/core';
import { RestaurantPublic } from '../../interfaces/restaurant';
import { RestaurantService } from '../../services/restaurant-service';
import { HappyHoursService } from '../../services/happy-hours-service';
import { HappyHour } from '../../interfaces/happyhour';
import { RestaurantCarouselItem } from '../../components/restaurant-carousel-item/restaurant-carousel-item';
import { Router, RouterModule } from '@angular/router';
import { HistorialService } from '../../services/historial-service';
import { LucideAngularModule, SearchIcon } from 'lucide-angular';

@Component({
  selector: 'app-home-page',
  imports: [RestaurantCarouselItem, RouterModule, LucideAngularModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  SearchIcon = SearchIcon;


  router = inject(Router)
  restaurantService = inject(RestaurantService)
  happyHourService = inject(HappyHoursService)
  historialService = inject(HistorialService)

  restaurants: RestaurantPublic[] = []
  mostVisit: RestaurantPublic[] = []
  restaurantsWithHH: RestaurantPublic[] = []
  recentRestaurants: RestaurantPublic[] = []
  historial: any[] = [];


  async ngOnInit() {
    this.historial = this.historialService.get();
    console.log(this.historial);

    await this.restaurantService.getAll();
    this.restaurants = this.restaurantService.restaurants
    this.mostVisit = this.restaurants.sort((a, b) => b.views - a.views).slice(0, 5)
    for (const restaurant of this.restaurants) {
      const happyHour = await this.happyHourService.getById(restaurant.id);
      if (happyHour !== null) {
        this.restaurantsWithHH.push(restaurant);
      }
    }
    for (const restInHistorial of this.historial) {
      const restaurant = await this.restaurantService.getById(restInHistorial.id)
      if(restaurant != null){
        this.recentRestaurants.push(restaurant);
      }
    }
    console.log(this.restaurantsWithHH);

  }

  search(query: string) {
    this.router.navigate(["/restaurants"] , { queryParams: { search: query } });
  }






}
