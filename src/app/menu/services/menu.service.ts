import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {ItemsImage} from "../../shared/interfaces/items-image";
import {Category} from "../../shared/interfaces/category";
import {Dish} from "../../shared/interfaces/dish";
import {environment} from "../../../environments/environment";
import {DishInfo} from "../../shared/interfaces/dish-info";
import {User} from "../../shared/interfaces/user";
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs";
import {OrderItems} from "../../shared/interfaces/order-item";

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

  public getDishInfoById (id : number) {
    let newDish : DishInfo
    return this.http.get<DishInfo>(`${environment.apiUrl}/dish-info/${id}`)
  }

  public getDishesInfoById (orderItems : OrderItems[]) {
    let ids : any = []
    orderItems.forEach((orderItem) => {
      ids.push(orderItem.itemId)
    })
    return this.http.post<DishInfo[]>(`${environment.apiUrl}/dishes-for-order`, ids)
  }

  public register(registerInfo : object): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/register`,registerInfo)
  }


  public getAllDishes() {
    return this.http.get<Dish[]>(`${environment.apiUrl}/dishes`)
  }
}
