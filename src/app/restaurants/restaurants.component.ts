import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsServices } from 'app/restaurants/restaurants.services';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({ 
        opacity: 0,
        "max-height": "0px"
        })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "max-width": "100%",
        "margin-top": "20px"
      })),
      transition('*=>*', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {
  
  searchBarState = 'hidden';
  restaurants: Restaurant[];
  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restaurantService: RestaurantsServices,
              private formBuilder: FormBuilder) {}

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

  ngOnInit() {
    this.searchControl = this.formBuilder.control('');
    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl
    });
    
    //this.searchControl.valueChanges.subscribe(searchTerm => console.log(searchTerm));
    this.searchControl.valueChanges.debounceTime(500)
      .distinctUntilChanged()
      //.do(searchTerm => console.log(`q=${searchTerm}`))
      .switchMap(searchTerm => 
      this.restaurantService.restaurants(searchTerm)
      .catch(error => Observable.from([])))
      .subscribe(restaurants => this.restaurants = restaurants);
    
    this.restaurantService.restaurants().subscribe(restaurants => this.restaurants = restaurants);
  }

}
