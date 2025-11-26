import { inject, Injectable } from '@angular/core';
import { Auth } from '../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() {
    // Si tengo sesion iniciada reviso que no este vencida
    if (this.token) {
      this.revisionTokenInterval = this.revisionToken()

    };
  };

  id: number | string | undefined
  router = inject(Router);
  token: null | string = localStorage.getItem("token");
  revisionTokenInterval: number | undefined;

  async login(loginData: Auth) {
    const res = await fetch("https://localhost:7164/api/authentication",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData),
      }
    )
    if (res.ok) {
      const resText = await res.text();
      this.token = resText;
      localStorage.setItem("token", this.token);
    }
    return res.ok;
  }

  logout() {
    localStorage.removeItem("token");
    this.token = null;
    this.router.navigate(["/login"]);
  }

  revisionToken() {
    return setInterval(() => {
      if (this.token) {
        const base64Url = this.token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const claims: { exp: number } = JSON.parse(jsonPayload);
        if (new Date(claims.exp * 1000) < new Date()) {
          this.logout()
        };
      };
    }, 600)
  };

  getIdFromToken(): string | number | null {
    if (!this.token) return null;
    
    try {
      const base64Url = this.token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const claims: any = JSON.parse(jsonPayload);
      
  
      return claims.id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }



  isAuthenticated() {
    return this.token !== null;
  }

}
