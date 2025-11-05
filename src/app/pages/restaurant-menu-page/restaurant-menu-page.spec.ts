import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMenuPage } from './restaurant-menu-page';

describe('RestaurantMenuPage', () => {
  let component: RestaurantMenuPage;
  let fixture: ComponentFixture<RestaurantMenuPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantMenuPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
