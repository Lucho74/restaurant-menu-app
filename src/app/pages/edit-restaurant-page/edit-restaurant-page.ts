import { Component, inject, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, ChevronLeftIcon } from 'lucide-angular';
import { FormsModule, NgForm } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant-service';
import { EditedRestaurant, RestaurantPublic } from '../../interfaces/restaurant';

@Component({
  selector: 'app-edit-restaurant-page',
  imports: [RouterModule, LucideAngularModule, FormsModule],
  templateUrl: './edit-restaurant-page.html',
  styleUrl: './edit-restaurant-page.scss',
})
export class EditRestaurantPage implements OnInit {
  BackIcon = ChevronLeftIcon;

  route = inject(ActivatedRoute)
  id: string | number | undefined;
  restaurantService = inject(RestaurantService)
  restaurantBack: RestaurantPublic | undefined;
  form = viewChild<NgForm>("restaurantForm");
  errorBack: boolean = false;
  backRequest: boolean = false;
  router = inject(Router)

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });

    const restaurant: RestaurantPublic | null = await this.restaurantService.me();
    if (restaurant) {
      this.restaurantBack = restaurant;

      // Parsear los días de apertura (formato: "1,2,3,4,5" -> {monday: true, tuesday: true, ...})
      const openingDaysArray = restaurant.openingDays ? restaurant.openingDays.split(',').map(d => parseInt(d)) : [];

      this.form()?.setValue({
        name: restaurant.name,
        description: restaurant.description || '',
        address: restaurant.address || '',
        number: restaurant.number || '',
        imagenUrl: restaurant.imageUrl || '',
        openingTime: restaurant.openingTime,
        closingTime: restaurant.closingTime,
        monday: openingDaysArray.includes(1),
        tuesday: openingDaysArray.includes(2),
        wednesday: openingDaysArray.includes(3),
        thursday: openingDaysArray.includes(4),
        friday: openingDaysArray.includes(5),
        saturday: openingDaysArray.includes(6),
        sunday: openingDaysArray.includes(0)
      })
    }
  }

  async handleFormSubmission(form: NgForm) {
    this.errorBack = false;
    
    this.ConvertOppeningDaysToString(form);
    const EditedRestaurant: EditedRestaurant = {
      name: form.value.name,
      description: form.value.description,
      address: form.value.address,
      number: form.value.number,
      imageUrl: form.value.imagenUrl,
      openingTime: form.value.openingTime,
      closingTime: form.value.closingTime,
      openingDays: this.openingDays
    }

    this.backRequest = true;
    let res;

    res = await this.restaurantService.edit(EditedRestaurant, this.restaurantBack!.id);
    this.backRequest = false;

    if (!res) {
      this.errorBack = true;
      return
    };

    // Actualizar los datos locales después de guardar exitosamente
    const updatedRestaurant = await this.restaurantService.me();
    if (updatedRestaurant) {
      this.restaurantBack = updatedRestaurant;
      
      // Marcar el formulario como pristine para deshabilitar el botón de guardar
      form.form.markAsPristine();
    }
  }

  openingDays: string = '';

  ConvertOppeningDaysToString(form: NgForm) {
    const days = [];

    if (form.value.monday) days.push('1');
    if (form.value.tuesday) days.push('2');
    if (form.value.wednesday) days.push('3');
    if (form.value.thursday) days.push('4');
    if (form.value.friday) days.push('5');
    if (form.value.saturday) days.push('6');
    if (form.value.sunday) days.push('7');

    this.openingDays = days.join(',');
  }

  back() {
    this.router.navigate(['my-restaurant/' + this.id ])
  }
}



