import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NewProduct, Product, ProductWithCategories, Discount } from '../../interfaces/product';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductsService } from '../../services/products-service';
import { ProductListItem } from "../product-list-item/product-list-item";
import { HappyHoursService } from '../../services/happy-hours-service';
import { HappyHour } from '../../interfaces/happyhour';
import { ChevronLeftIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-new-edit-product-card',
  imports: [FormsModule, ProductListItem, LucideAngularModule, RouterLink, RouterOutlet],
  templateUrl: './new-edit-product-card.html',
  styleUrl: './new-edit-product-card.scss',
})
export class NewEditProductCard implements OnInit {
  backIcon = ChevronLeftIcon;

  id: number | string | undefined
  productService = inject(ProductsService)
  happyHourService = inject(HappyHoursService)
  happyHour: HappyHour | null = null;
  router = inject(Router)
  route = inject(ActivatedRoute)
  productId: number | string | undefined
  productBack: ProductWithCategories | undefined;
  form = viewChild<NgForm>("productForm");
  errorBack: boolean = false;
  backRequest: boolean = false;



  async ngOnInit() {
    document.body.classList.add('overflow-hidden');
    this.route.parent?.params.subscribe(params => {
      this.id = params['id']
    });
    this.route.params.subscribe(params => {
      this.productId = params['productId']
    });

    console.log(this.productId);
    
    
    
    

    this.happyHour = await this.happyHourService.getById(this.id!);


    if(this.productId){
      const product: ProductWithCategories | null = await this.productService.getById(this.productId!);
      if(product){
        this.productBack = product;
        this.form()?.setValue({
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          isFeatured: product.isFeatured,
          hasHappyHour: product.hasHappyHour
        })
      }
    }
  }

  async handleFormSubmission(form:NgForm){
    this.errorBack = false;

    const isFeatured = form.value.isFeatured ? true : false;
    const hasHappyHour = form.value.hasHappyHour ? true : false;
    const newProduct: NewProduct ={
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      imageUrl: form.value.imageUrl,
      isFeatured: isFeatured,
      hasHappyHour: hasHappyHour
    }

    this.backRequest = true;
    let res;

    if(this.productId){
      res = await this.productService.edit({
        ...newProduct, id: this.productBack!.id,
        hasDiscount: false,
        discountPercentage: this.productBack!.discountPercentage,
        discountPrice: this.productBack!.discountPrice,
        discountStart: this.productBack!.discountStart,
        discountEnd: this.productBack!.discountEnd,
        happyHourPrice: this.productBack!.happyHourPrice,
        restaurantId: this.productBack!.restaurantId,
        categoryIds: this.productBack!.categoryIds
      });
    } else {
      res = await this.productService.create(newProduct);
    }
    this.backRequest = false;

    if(!res) {
      this.errorBack = true;
      return
    };
    
    this.close()

    }


    async deleteProduct(product: ProductWithCategories) {
          for (const categoryId of product.categoryIds) {
            await this.productService.deleteProductFromCategory(product.id, categoryId);
          }
          await this.productService.delete(product.id);
          this.close()
      }

  close() {
    document.body.classList.remove('overflow-hidden');
    
    this.router.navigate(['my-restaurant/' + this.id + "/menu"])
  }

  addDiscount(product: ProductWithCategories) {
    this.router.navigate(['my-restaurant/' + this.id + "/menu/edit-product/" + product.id + "/add-discount"])
  }

  async deleteDiscount(product: ProductWithCategories) {
    const discount: Discount = {
      hasDiscount: false,
      discountPercentage: 0,
      discountStart: "",
      discountEnd: ""
    }
    await this.productService.applyDiscount(product.id, discount);
    this.close()
  }



}

