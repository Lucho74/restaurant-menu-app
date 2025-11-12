import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant-service';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule],
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
    
    if (form.value.password !== form.value.password2){
      this.errorPasswords = true;
      return;
    }
    this.backRequest = true;
    const ok = await this.restaurantsService.register({
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
      number: "",
      imageUrl: '',
      description: '',
      address: '',
      openingTime: '08:00:00',
      closingTime: '23:59:59',
      openingDays: ''
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
}
