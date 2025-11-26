import { inject, Injectable } from '@angular/core';
import { EditedRestaurant, NewRestaurant, RestaurantPublic } from '../interfaces/restaurant';
import { AuthService } from './auth-service';
import { HappyHour } from '../interfaces/happyhour';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {


  authService = inject(AuthService)
  URLapi = "https://localhost:7164/api/restaurants"
  restaurants: RestaurantPublic[] = []


  async register(registerRestaurant: NewRestaurant) {
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

  async edit(editedRestaurant: EditedRestaurant, id: string | number) {
    const res = await fetch(this.URLapi + "/" + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token,
      },
      body: JSON.stringify(editedRestaurant),
    });
    return res.ok;

  }


  async getAll(search = "") {
    const res = await fetch(this.URLapi,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.authService.token
        }
      }
    )
    if (res.ok) {
      const resJason: RestaurantPublic[] = await res.json()
      if (search) {
        this.restaurants = resJason.filter(
          r => r.name.toLowerCase().startsWith(search.toLowerCase()))
      }
      else {
        this.restaurants = resJason
      }
    }
  }

  async getById(id: string | number) {
    const res = await fetch(this.URLapi + "/" + id,
      {
        method: "GET",

        headers: {
          Authorization: "Bearer " + this.authService.token
        }
      }
    )
    if (res.ok) {
      const resJason: RestaurantPublic = await res.json()
      return resJason
    }
    return null
  }

  async visit(id: string | number) {
    const res = await fetch(this.URLapi + "/" + id + "/visit", {
      method: "PUT"
    })
    if (res.ok) {

    }
  }

  async me() {
    const res = await fetch(this.URLapi + "/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.authService.token
      }
    }
    )
    if (res.ok) {
      const resJason: RestaurantPublic = await res.json()
      return resJason
    }
    return null

  }
}





