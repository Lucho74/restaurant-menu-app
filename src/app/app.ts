import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarLayout } from "./layouts/nav-bar-layout/nav-bar-layout";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('restaurant-menu-app');

  router = inject(Router)

  ngOnInit(){
    
  }


  navBarCanActive(){
    if (this.router.url.includes("edit")
      || this.router.url.includes("add")
      || this.router.url.includes("delete")
      || this.router.url.includes("config")) {
      return false
    }
    else {
      return true
    }
  }
}
