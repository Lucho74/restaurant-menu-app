import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';
import { LucideAngularModule, StoreIcon, HouseIcon, SearchIcon } from 'lucide-angular';
import { RestaurantService } from '../../services/restaurant-service';
import { RestaurantPublic } from '../../interfaces/restaurant';

@Component({
  selector: 'app-nav-bar-layout',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './nav-bar-layout.html',
  styleUrl: './nav-bar-layout.scss',
})
export class NavBarLayout {
  StoreIcon = StoreIcon;
  HouseIcon = HouseIcon;
  SearchIcon = SearchIcon;




  router = inject(Router)
  authService = inject(AuthService)
  restaurantService = inject(RestaurantService)
  restaurant: RestaurantPublic | null = null;

  isAuthenticated() {
    if (this.authService.token) {
      const id = this.authService.getIdFromToken()
      console.log(id);
      
      this.router.navigate(["/my-restaurant/" + id])
    }
    this.router.navigate(["/login"])
    return
  }
  
  }




