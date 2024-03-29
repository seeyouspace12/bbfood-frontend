import { Inject, Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { LOCAL_STORAGE, StorageService} from "ngx-webstorage-service";
import {OrderItems} from "../../../shared/interfaces/order-item";

const COUNT_STORAGE_KEY = 'count';
const ORDER_STORAGE_KEY = 'order'


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageStatus = new Subject<string>();
  constructor (
    @Inject(LOCAL_STORAGE)
    private storage: StorageService
  ) {}

  watchStorage(): Observable<any> {
    return this.storageStatus.asObservable();
  }

  // Set Methods
  public setCount(count: number) {
    this.storage.set(COUNT_STORAGE_KEY, this.getNewCount(count))
    this.storageStatus.next('changed') // tell subscribers storage status is updated
  }

  maxItemKey : number = 16

  public setOrderItem(itemId : number, count: number) {
    let newStorage = [{
      itemId,
      count
    }]

    if(this.getItemById(ORDER_STORAGE_KEY)) {
      let prevent = this.getItemById(ORDER_STORAGE_KEY)
      let foundItem = prevent.find((item : any) => item.itemId === itemId)

      if(foundItem) {
        let index = prevent.indexOf(foundItem)
        let prevCount = prevent[index].count
        prevent[index] = {
          itemId,
          count: prevCount + count
        }
        this.storage.set(ORDER_STORAGE_KEY, prevent)
      }

      else {
        newStorage = prevent.concat(newStorage)
        this.storage.set(ORDER_STORAGE_KEY, newStorage)
      }
    }

    else {
      this.storage.set(ORDER_STORAGE_KEY, newStorage)
    }

    this.storageStatus.next('changed'); // tell subscribers storage status is updated
  }

  private getNewCount(count : number) {
    if(this.getCount()) {
      count += Number(this.getCount())
      return count
    }
    else {
      return count
    }
  }


  public getAllOrderItems() {
    let OrderItems : OrderItems[] = []
    let newOrderItem : OrderItems
    for(let i = 1; i < this.maxItemKey; i++) {
      if(this.getItemById(String(i))) {
        let count = this.getItemById(String(i))
        newOrderItem = {
          dishId : i,
          count : count
        }
        OrderItems.push(newOrderItem)
      }
    }
    return OrderItems
  }

  // public setOrderItem2(itemId : number, count: number) {
  //   if (this.getItemById(String(itemId)) && String(itemId) !== COUNT_STORAGE_KEY) {
  //     count += this.getItemById(String(itemId))
  //   }
  //
  //   this.storage.set(String(itemId), count)
  //   this.maxItemKey = itemId
  //   this.storageStatus.next('changed'); // tell subscribers storage status is updated
  // }

  // public removeOrderItem (itemId : number) {
  //   //let count = this.getItemById(String(itemId))
  //   this.storage.remove(String(itemId))
  //   //this.count -= count
  // }
  //
  // public plusOrderItem (itemId : number) {
  //   let count = this.getItemById(String(itemId)) + 1
  //   this.removeOrderItem (itemId)
  //   this.setOrderItem(itemId, count)
  //   this.setCount(1)
  // }
  //
  // public minusOrderItem (itemId : number) {
  //   let count = this.getItemById(String(itemId)) - 1
  //   this.removeOrderItem (itemId)
  //   if (count) {
  //     this.setOrderItem(itemId, count)
  //     this.setCount(-1)
  //   }
  // }

  // Get Method
  public getCount() {
    return this.storage.get(COUNT_STORAGE_KEY);
  }

  private getItemById(id : string) {
    return this.storage.get(id);
  }

  ////////////////


}
