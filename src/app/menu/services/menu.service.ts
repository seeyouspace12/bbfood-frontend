import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Category} from "../../shared/interfaces/category";
import {environment} from "../../../environments/environment";
import {DishInfo} from "../../shared/interfaces/dish-info";
import {OrderItems} from "../../shared/interfaces/order-item";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) {}

  public getCategories() {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`)
  }

  public getDishesInfoByType (id : number) {
    return this.http.get<DishInfo[]>(`${environment.apiUrl}/dishes-info/${id}`)
  }

  public getDishesInfoById (orderItems : OrderItems[]) {
    let ids : any = []
    orderItems.forEach((orderItem) => {
      ids.push(orderItem.itemId)
    })
    return this.http.post<DishInfo[]>(`${environment.apiUrl}/dishes-for-order`, ids)
  }

  public createOrder (date : string, address : string, orderItems : OrderItems[]) {
    const data = {
      date,
      address,
      orderItems
    }
    console.log(data)
    return this.http.post<JSON>(`${environment.apiUrl}/create-order`, data)

  }

}
