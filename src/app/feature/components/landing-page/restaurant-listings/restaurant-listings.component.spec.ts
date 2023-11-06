import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantListingsComponent } from './restaurant-listings.component';

describe('RestaurantListingsComponent', () => {
  let component: RestaurantListingsComponent;
  let fixture: ComponentFixture<RestaurantListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantListingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
