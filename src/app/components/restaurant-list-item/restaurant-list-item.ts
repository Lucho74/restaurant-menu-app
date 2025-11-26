import { Component, input } from '@angular/core';
import { RestaurantPublic } from '../../interfaces/restaurant';

@Component({
  selector: 'app-restaurant-list-item',
  imports: [],
  templateUrl: './restaurant-list-item.html',
  styleUrl: './restaurant-list-item.scss',
})
export class RestaurantListItem {

  restaurant = input.required<RestaurantPublic>();
  imgDefault: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgVfHORQFLyUf_rNove-xUmxIskDeMJ63REz_YIMQ6S0vCyQdkBvJos4igKspvCgpqnpy8h0xM--1uckzZIxDgyoHy37-MowkF-YzvVx8&s=10"

  RestaurantImage() {
    const img = this.restaurant().imageUrl
    if (img != null && img !== '')
      return img
    else
      return this.imgDefault
  }


}
