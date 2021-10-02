import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {ItemsImage} from "../../shared/interfaces/items-image";
import {NavImage} from "../../shared/interfaces/nav-image";
import {Dish} from "../../shared/interfaces/dish";
import {environment} from "../../../environments/environment";
import {OrderItems} from "../../shared/interfaces/order-item";
import {Subject} from "rxjs";
import {DishInfo} from "../../shared/interfaces/dish-info";
import {takeUntil} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) {}

  images: ItemsImage[] = []

  notifier = new Subject()

  public getImages() {
    return this.http.get<ItemsImage[]>(`${environment.apiUrl}/images`)
  }

  public getImageById(id: number) {
    return this.http.get<ItemsImage>(`${environment.apiUrl}/images/${id}`)
  }

  public getNavImages() {
    return this.http.get<NavImage[]>(`${environment.apiUrl}/nav-images`)
  }

  public getDishesInfoByType (id : number) {
    return this.http.get<DishInfo[]>(`${environment.apiUrl}/dishes-info/${id}`)
  }

  public getDishById (id : number) {
    return this.http.get<Dish>(`${environment.apiUrl}/dish/${id}`)
  }

  public getAllDishesInfo() {
    return this.http.get<Dish[]>(`${environment.apiUrl}/dishes`)
  }

  public getAllDishes() {
    return this.http.get<Dish[]>(`${environment.apiUrl}/dishes`)
  }

  public getOrderItems() {
    return this.http.get<OrderItems[]>(`${environment.apiUrl}/order-info`)
  }
}
