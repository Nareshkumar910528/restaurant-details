import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule } from '@angular/router';
import { RestaurantListingsComponent } from './restaurant-listings/restaurant-listings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipe } from 'src/app/core/search-filter.pipe';

@NgModule({
  declarations: [
    LandingPageComponent,
    RestaurantListingsComponent,
    SearchFilterPipe
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LandingPageComponent
      }
    ]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class LandingPageModule { }
