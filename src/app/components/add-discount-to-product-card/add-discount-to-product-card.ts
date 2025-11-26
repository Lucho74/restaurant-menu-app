import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChevronLeftIcon, LucideAngularModule } from 'lucide-angular';
import { Discount } from '../../interfaces/product';
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-add-discount-to-product-card',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './add-discount-to-product-card.html',
  styleUrl: './add-discount-to-product-card.scss',
})
export class AddDiscountToProductCard implements OnInit {
  backIcon = ChevronLeftIcon;

  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductsService);
  id: string | number | undefined;
  productId: string | number | undefined;

  async ngOnInit() {
    
    this.route.parent?.params.subscribe(params => {
      this.productId = params['productId']
    });
    
    this.route.parent?.parent?.params.subscribe(params => {
      this.id = params['id']
    });
  }

  async handleFormSubmission(form: NgForm) {


    console.log(form.value);

    const discount: Discount = {
      hasDiscount: true,
      discountPercentage: form.value.discount,
      discountStart: form.value.startDate + "T00:00:01.000Z",
      discountEnd: form.value.endDate + "T00:00:01.000Z"
    }
    console.log(this.id, this.productId, discount);
    
    const res = await this.productService.applyDiscount(this.productId!, discount);
    if (res) {
      this.close()
    }
  }

  close() {
    document.body.classList.remove('overflow-hidden');
    this.router.navigate(['my-restaurant/' + this.id + "/menu"])
  }
}
