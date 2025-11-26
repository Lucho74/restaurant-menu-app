import { inject, Injectable } from '@angular/core';
import { Discount, NewProduct, Product, ProductWithCategories } from '../interfaces/product';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  authService = inject(AuthService)
  URLapi = "https://localhost:7164/api/products"
  products: Product[] = []

  async create(newProduct: NewProduct) {
    const res = await fetch(this.URLapi,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.token,
        },
        body: JSON.stringify(newProduct),
      });
    return res.ok;
  }

  async getAll(restId: string | number) {
    const res = await fetch(this.URLapi + "?restId=" + restId)
    if (res.ok) {
      const resJason: Product[] = await res.json()
      this.products = resJason
    }
  }
  async getAllByCategory(categoryId: string | number) {
    const res = await fetch(this.URLapi + "/category/" + categoryId)
    if (res.ok) {
      const resJason: Product[] = await res.json()
      this.products = resJason
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
      const resJason: ProductWithCategories = await res.json()
      return resJason
    }
    return null
  }

  async edit(editedProduct: Product) {
    const res = await fetch(this.URLapi + "/" + editedProduct.id,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.token,
        },
        body: JSON.stringify(editedProduct),
      });
    if (!res.ok) return;
    this.products = this.products.map(oldProduct => {
      if (oldProduct.id === editedProduct.id) return editedProduct;
      return oldProduct;
    })
    return editedProduct;
  }

  async addProductToCategory(productId: number | string, categoryId: number | string) {
    const res = await fetch(this.URLapi + "/" + productId + "/category/" + categoryId,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.token,
        },
      });
    return res.ok;
  }

  async deleteProductFromCategory(productId: number | string, categoryId: number | string) {
    const res = await fetch(this.URLapi + "/" + productId + "/category/" + categoryId,
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.token,
        },
      });
    return res.ok;
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
    this.products = this.products.filter(product => product.id !== id)
  }


  async applyDiscount(productId: number | string, discount: Discount) {
    const res = await fetch(this.URLapi + "/" + productId + "/discount",
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.token,
        },
        body: JSON.stringify(discount),
      });
    if (!res.ok) return;
    this.products = this.products.map(oldProduct => {
      if (oldProduct.id === productId) return {...oldProduct, discount};
      return oldProduct;
    })
    return discount;
  }

}
