import { inject, Injectable } from '@angular/core';
import { NewRestaurant } from '../interfaces/restaurant';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  authService = inject(AuthService)
  URLapi = "https://localhost:7164/api/restaurants"
  
  
  async register(registerRestaurant: NewRestaurant){
    const res = await fetch(this.URLapi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token,
      },
      body: JSON.stringify(registerRestaurant),
    });
    return res.ok;
    
  }
}
