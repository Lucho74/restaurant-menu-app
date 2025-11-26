import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { LucideAngularModule, EditIcon, UtensilsCrossedIcon, EyeIcon, LogOutIcon } from 'lucide-angular';

@Component({
  selector: 'app-my-restaurant-page',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './my-restaurant-page.html',
  styleUrl: './my-restaurant-page.scss',
})
export class MyRestaurantPage {
  
  authService = inject(AuthService)
  
  EditIcon = EditIcon;
  UtensilsIcon = UtensilsCrossedIcon;
  EyeIcon = EyeIcon;
  LogOutIcon = LogOutIcon;


    logout(){
    this.authService.logout()
  }
}
