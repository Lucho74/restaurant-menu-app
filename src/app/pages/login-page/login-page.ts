import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {

  authService = inject(AuthService);
  router = inject(Router)
  error = false;
  backRequest = false;

  async login(form: NgForm) {
    console.log(form.value)
    this.error = false;

    if (
      !form.value.email ||
      !form.value.password
    ) {
      this.error = true;
      return
    }
    this.backRequest = true;
    const ok = await this.authService.login(form.value);
    this.backRequest = false;

    if (!ok) {
      this.error = true;
    }
    else {
      this.router.navigate(["/"]);
    }
  }

}
