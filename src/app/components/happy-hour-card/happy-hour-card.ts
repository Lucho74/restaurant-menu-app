import { Component, inject, OnInit, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HappyHour, NewHappyHour } from '../../interfaces/happyhour';
import { HappyHoursService } from '../../services/happy-hours-service';
import { ChevronLeftIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-happy-hour-card',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './happy-hour-card.html',
  styleUrl: './happy-hour-card.scss',
})
export class HappyHourCard implements OnInit {
  backIcon = ChevronLeftIcon;

  id: number | string | undefined
  router = inject(Router)
  route = inject(ActivatedRoute)
  happyHourService = inject(HappyHoursService)
  happyHourBack: HappyHour | null = null;
  form = viewChild<NgForm>("happyHourForm");
  errorBack: boolean = false;
  backRequest: boolean = false;

  async ngOnInit() {
    document.body.classList.add('overflow-hidden');
    this.route.parent?.params.subscribe(params => {
      this.id = params['id']
    });

    const happyHour: HappyHour | null = await this.happyHourService.getById(this.id!);
    if (happyHour) {
      this.happyHourBack = happyHour;
      this.form()?.setValue({
        isActive: happyHour.isActive,
        discount: happyHour.discountPercentage,
        startTime: happyHour.startTime,
        endTime: happyHour.endTime,
      })
    }
  }

  async handleFormSubmission(form: NgForm) {
    this.errorBack = false;

    const newHappyHour: NewHappyHour = {
      discountPercentage: form.value.discount,
      startTime: form.value.startTime,
      endTime: form.value.endTime,
      isActive: form.value.isActive
    }

    this.backRequest = true;
    let res;
    console.log(newHappyHour);
    
    if (this.happyHourBack) {
      res = await this.happyHourService.editConfig({
        ...newHappyHour,
        restaurantId: this.happyHourBack.restaurantId,
      });
    } else {
      res = await this.happyHourService.Addconfig(newHappyHour);
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
