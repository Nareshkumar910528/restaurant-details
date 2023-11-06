import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { RestaurantDetailsService } from 'src/app/shared/services/restaurant-details.service';

@Component({
  selector: 'restaurant-listings',
  templateUrl: './restaurant-listings.component.html',
  styleUrls: ['./restaurant-listings.component.scss']
})
export class RestaurantListingsComponent implements OnInit {

  restaurantDetails: any;
  restaurantTypes: any;
  filteredType: any;
  showData: boolean;

  searchRestaurantName: string;

  constructor(private restaurantDetailsService: RestaurantDetailsService) { }

  ngOnInit(): void {
    console.log('RestaurantListingsComponent');
    this.getRestaurantRecords();
  }

  getRestaurantRecords() {
    this.restaurantDetailsService.retrieveAllRestaurantsRecords().subscribe((records: any) => {
      if (records.length > 0) {
        this.showData = true;
        this.restaurantDetails = records;
        let x = this.restaurantDetails.map((type: any) => {
          return type.restaurantType;
        });
        this.restaurantTypes = [...new Set(x)];
        this.restaurantTypes.sort((a: any, b: any) => a.localeCompare(b));
      } else {
        this.showData = false;
      }
    });
  }

  onSearchFilterMethod(column: number, id: string) {
    let input, filter, table, tr, td, i, txtValue;

    input = (<HTMLInputElement>document.getElementById(id));

    filter = input!.value.toUpperCase();

    table = document.getElementById("myTable");
    
    tr = table!.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[column];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "table-row";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  alterCoordinate(coordinate: any) {
    let splitCoordinate = (coordinate as any).replace(/\|+/g, ',').split(',');
    let restaurant_coordinate = {
      latitude: parseFloat(splitCoordinate[0]).toFixed(6),
      longitude: parseFloat(splitCoordinate[1]).toFixed(6)
    };
    return restaurant_coordinate.latitude + ', ' + restaurant_coordinate.longitude;
  }

  onSearchRestaurant() {
    this.onSearchFilterMethod(1, 'myInput');
  }

  onFilterRestaurantType(type: any) {
    this.filteredType = type.target.value;
    this.onSearchFilterMethod(2, '$event');
  }

  onDeleteRestaurant(restaurantID: number) {
    this.restaurantDetailsService.deleteRestaurant(restaurantID).subscribe((data) => {
      let deletedRestaurantData = data;
    })
  }

  onViewRestaurantCoordinate(index: number) {
    let latitude = this.restaurantDetails[index].latitude;
    let longitude = this.restaurantDetails[index].longitude;
    window.alert("Restaurant Name: " + this.restaurantDetails[index].restaurantName
      + '\n\n' + "Latitude: " + latitude
      + '\n\n' + "Longitude: " + longitude);
  }

  onViewRestaurantLatLon(index: number) {
    let splitCoordinate = this.restaurantDetails[index].coordinate.replace(/\|+/g, ',').split(',');
    let restaurant_coordinate = {
      latitude: parseFloat(splitCoordinate[0]).toFixed(6),
      longitude: parseFloat(splitCoordinate[1]).toFixed(6)
    };
    window.alert("Restaurant Name: " + this.restaurantDetails[index].restaurantName
      + '\n\n' + "Latitude: " + restaurant_coordinate.latitude
      + '\n\n' + "Longitude: " + restaurant_coordinate.longitude);
  };
}
