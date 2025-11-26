import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private key = 'app_historial';

  add(item: any) {
    const historial = this.get();
    const noDuplicates = historial.filter(i => i.id !== item.id);
    noDuplicates.unshift(item); // Agregar al inicio
    const limited = noDuplicates.slice(0, 5);
    localStorage.setItem(this.key, JSON.stringify(limited));
  }

  get(): any[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}
