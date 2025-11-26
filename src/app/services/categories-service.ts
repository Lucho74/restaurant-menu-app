import { inject, Injectable } from '@angular/core';
import { Category, CategoryWithProducts, NewCategory } from '../interfaces/category';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  URLapi = "https://localhost:7164/api/categories"

  authService = inject(AuthService)
  categories: Category[] = []

  async create(NewCategory: NewCategory) {
    const res = await fetch(this.URLapi,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.token,
        },
        body: JSON.stringify(NewCategory),
      });
    return res.ok;
  }

  async edit(editedCategory: Category) {
    const res = await fetch(this.URLapi + "/" + editedCategory.id,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.token,
        },
        body: JSON.stringify(editedCategory),
      });
    if (!res.ok) return;
    this.categories = this.categories.map(oldCategory => {
      if (oldCategory.id === editedCategory.id) return editedCategory;
      return oldCategory;
    })
    return editedCategory;
  }

  async getAll(restId: string | number) {
      const res = await fetch(this.URLapi + "?restId=" + restId)

      if (res.ok) {
        const resJason: Category[] = await res.json()
        this.categories = resJason
      }
    }

  async getById(id: string | number) {
      const res = await fetch(this.URLapi + "/" + id,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        }
      )
      if (res.ok) {
        const resJason: CategoryWithProducts = await res.json()
        return resJason
      }
      return null
    }

  async delete(id: string | number) {
    const res = await fetch(this.URLapi + "/" + id,
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.token,
        },
      });
    if (!res.ok) {
      return
    }
    this.categories = this.categories.filter(category => category.id !== id)
  }


}

