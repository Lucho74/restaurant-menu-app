import { Component, inject, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantPublic } from '../../interfaces/restaurant';
import { HappyHour } from '../../interfaces/happyhour';
import { HappyHoursService } from '../../services/happy-hours-service';

@Component({
  selector: 'app-restaurant-carousel-item',
  imports: [CommonModule],
  templateUrl: './restaurant-carousel-item.html',
  styleUrl: './restaurant-carousel-item.scss',
})
export class RestaurantCarouselItem implements OnInit{

  happyHoursService = inject(HappyHoursService)
  restaurant = input.required<RestaurantPublic>()

  ngOnInit() {
    
}



}