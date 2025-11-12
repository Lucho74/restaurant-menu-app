import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header-layout',
  imports: [RouterOutlet],
  templateUrl: './header-layout.html',
  styleUrl: './header-layout.scss',
})
export class HeaderLayout {
  authService = inject(AuthService);

  logout(){
    this.authService.logout()
  };
}
