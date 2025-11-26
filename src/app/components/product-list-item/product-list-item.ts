import { Component, input, OnInit, inject } from '@angular/core';
import { Product, ProductWithCategories } from '../../interfaces/product';
import { ProductsService } from '../../services/products-service';
import { ActivatedRoute } from '@angular/router';
import { HappyHoursService } from '../../services/happy-hours-service';
import { HappyHour } from '../../interfaces/happyhour';

@Component({
  selector: 'app-product-list-item',
  imports: [],
  templateUrl: './product-list-item.html',
  styleUrl: './product-list-item.scss',
})
export class ProductListItem implements OnInit {
  productId = input.required<number>()
  restaurantId = input.required<number | string>()
  productService = inject(ProductsService)
  happyHourService = inject(HappyHoursService)
  route = inject(ActivatedRoute);
  id : number | string | undefined;
  happyHour: HappyHour | null = null;
  product: ProductWithCategories | undefined
  backRequest = false;

  async ngOnInit() {
    this.backRequest = true
   
    this.happyHour = await this.happyHourService.getById(this.restaurantId()!);
    
    if (this.productId()) {
      const res = await this.productService.getById(this.productId());
      if (res) this.product = res;
    }
    this.backRequest = false
  }

  isHappyHourNow(): boolean {
    if (!this.happyHour || !this.happyHour.isActive) {
      return false;
    }

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Minutos desde medianoche

    const [startHour, startMinute] = this.happyHour.startTime.split(':').map(Number);
    const [endHour, endMinute] = this.happyHour.endTime.split(':').map(Number);
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;

    if (startTimeInMinutes <= endTimeInMinutes) {
      return currentTime >= startTimeInMinutes && currentTime <= endTimeInMinutes;
    } else {
      return currentTime >= startTimeInMinutes || currentTime <= endTimeInMinutes;
    }
  }


}
