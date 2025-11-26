import { inject, Injectable } from '@angular/core';
import { HappyHour, NewHappyHour } from '../interfaces/happyhour';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class HappyHoursService {

  authService = inject(AuthService)
  URLapi = "https://localhost:7164/api/happyhour"
  happyHours: HappyHour[] = []


  async Addconfig(newHappyHour: NewHappyHour) {
    const res = await fetch(this.URLapi,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.token,
        },
        body: JSON.stringify(newHappyHour),
      });
    return res.ok;
  }

   async editConfig(editedHappyHour: HappyHour) {
    const res = await fetch(this.URLapi + "/" + editedHappyHour.restaurantId,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.token,
        },
        body: JSON.stringify(editedHappyHour),
      });
    return res.ok;
  }

  async getAll() {
    const res = await fetch(this.URLapi,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer "
        }
      }
    )
    if (res.ok) {
      const resJason: HappyHour[] = await res.json()
      this.happyHours = resJason
    }
  }

  async getById(id: string | number) {
    const res = await fetch(this.URLapi + "/" + id,
      {
        method: "GET",

        headers: {
          Authorization: "Bearer "
        }
      }
    )
    if (res.ok) {
      const resJason: HappyHour = await res.json()
      return resJason
    }
    return null
  }

}
