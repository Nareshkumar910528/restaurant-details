import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantDetailsService } from 'src/app/shared/services/restaurant-details.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent implements OnInit {
  public restaurantDetailsForm: FormGroup;
  typeOfRestaurant: any;
  restaurantName: FormControl;
  latitude: FormControl;
  longitude: FormControl;
  restaurantType: string;
  guid: any;
  
  constructor(private formBuilder: FormBuilder, private restaurantDetailsService: RestaurantDetailsService) {
    this.restaurantName = new FormControl('', Validators.compose([Validators.required]));
    this.latitude = new FormControl('', Validators.compose([Validators.required]));
    this.longitude = new FormControl('', Validators.compose([Validators.required]));

    this.restaurantDetailsForm = formBuilder.group({
      restaurantName: this.restaurantName,
      latitude: this.latitude,
      longitude: this.longitude
    })
   }

  ngOnInit(): void {
    console.log('LandingPageComponent');

    this.restaurantDetailsService.getTypeOfRestaurants().subscribe((data: any) => {
      this.typeOfRestaurant = data.restaurantType.sort((a: any, b: any) => a.type.localeCompare(b.type));
    });
  }

  onInputRestaurantName(name: any) {
    this.restaurantName = name.target.value;
  }

  onInputLatitude(latitude: any) {
    this.latitude = latitude.target.value;
  }

  onInputLongitude(logitude: any) {
    this.longitude = logitude.target.value;
  }

  onSelectRestaurantType(type: any) {
    this.restaurantType = type.target.value;
  }

  validateFormCompletion() {
    if (this.restaurantType !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  onSaveRestaurantDetails() {
    this.guid = Guid.create();
    let restaurantDetails = {
      guid: this.guid.value,
      restaurantName: this.restaurantName,
      latitude: this.latitude,
      longitude: this.longitude,
      restaurantType: this.restaurantType
    }
    this.restaurantDetailsService.createNewRestaurantRecord(restaurantDetails).subscribe((records) => {
    }, err => {
    }, () => {
    });
  }

}
