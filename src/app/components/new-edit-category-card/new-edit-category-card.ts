import { Component, inject, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryWithProducts, NewCategory } from '../../interfaces/category';
import { CategoriesService } from '../../services/categories-service';
import { ChevronLeftIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-new-edit-category-card',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './new-edit-category-card.html',
  styleUrl: './new-edit-category-card.scss',
})
export class NewEditCategoryCard implements OnInit {
  backIcon = ChevronLeftIcon;

  categoryService = inject(CategoriesService)
  router = inject(Router);
  route = inject(ActivatedRoute);
  id: string | null = null;
  categoryId: number | string | undefined;
  categoryBack: CategoryWithProducts | undefined;
  form = viewChild<NgForm>("categoryForm");
  errorBack: boolean = false;
  backRequest: boolean = false;



  async ngOnInit() {
    document.body.classList.add('overflow-hidden');
    this.route.parent?.params.subscribe(params => {
      this.id = params['id']
    });
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId']
    });


    if (this.categoryId) {
      const category: CategoryWithProducts | null = await this.categoryService.getById(this.categoryId!);
      if (category) {
        this.categoryBack = category;
        this.form()?.setValue({
          name: category.name,
          description: category.description
        })
      }
    }
  }

  async handleFormSubmission(form: NgForm) {
    this.errorBack = false;

    const NewCategory: NewCategory = {
      name: form.value.name,
      description: form.value.description,
    }

    this.backRequest = true;
    let res;

    if (this.categoryId) {
      res = await this.categoryService.edit({
        ...NewCategory,
        id: this.categoryBack!.id,
        restaurantId: this.categoryBack!.restaurantId,
        productIds: this.categoryBack!.productIds
      });
    } else {
      res = await this.categoryService.create(NewCategory);
    }
    this.backRequest = false;

    if (!res) {
      this.errorBack = true;
      return
    };

    this.close()

  }

  close() {
    document.body.classList.remove('overflow-hidden');
    this.router.navigate(['my-restaurant/' + this.id + "/menu"])
  }

}
