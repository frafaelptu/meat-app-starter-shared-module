import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsServices } from 'app/restaurants/restaurants.services';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('restaurantAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RestaurantsComponent implements OnInit {
  
  restaurants: Restaurant[];

  constructor(private restaurantService: RestaurantsServices) {}

  ngOnInit() {
    this.restaurantService.restaurants().subscribe(restaurants => this.restaurants = restaurants);
  }

}
