import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RestaurantService } from '../../services/restaurant-service';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule, RouterModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  errorService = false;
  errorRegisterForm = false;
  errorPasswords = false;
  backRequest = false;

  restaurantsService = inject(RestaurantService);
  router = inject(Router)

  async register(form: NgForm) {
    console.log(form.value)
    this.errorRegisterForm = false;
    this.errorPasswords = false;
    this.errorService = false;
    if (
      !form.value.name ||
      !form.value.email ||
      !form.value.password ||
      !form.value.password2
    ) {
      this.errorRegisterForm = true;
      return;
    }

    if (form.value.password !== form.value.password2) {
      this.errorPasswords = true;
      return;
    }
    this.backRequest = true;
    this.ConvertOppeningDaysToString(form);
    const ok = await this.restaurantsService.register({
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
      number: form.value.number,
      imageUrl: form.value.imageUrl,
      description: form.value.description,
      address: form.value.address,
      views: 0,
      openingTime: form.value.openingTime + ":00",
      closingTime: form.value.closingTime + ":00",
      openingDays: this.openingDays
    });
    this.backRequest = false;

    if (!ok) {
      this.errorService = true;
      return
    }
    else {
      this.router.navigate(["/login"]);
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
}
