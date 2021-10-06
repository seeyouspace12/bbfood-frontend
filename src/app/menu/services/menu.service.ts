import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {ItemsImage} from "../../shared/interfaces/items-image";
import {Category} from "../../shared/interfaces/category";
import {Dish} from "../../shared/interfaces/dish";
import {environment} from "../../../environments/environment";
import {DishInfo} from "../../shared/interfaces/dish-info";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) {}

  public getImageById(id: number) {
    return this.http.get<ItemsImage>(`${environment.apiUrl}/images/${id}`)
  }

  public getCategories() {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`)
  }

  public getDishesInfoByType (id : number) {
    return this.http.get<DishInfo[]>(`${environment.apiUrl}/dishes-info/${id}`)
  }

  public getAllDishes() {
    return this.http.get<Dish[]>(`${environment.apiUrl}/dishes`)
  }
}
