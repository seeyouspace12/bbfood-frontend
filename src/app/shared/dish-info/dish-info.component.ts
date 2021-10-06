import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ORDERITEMS} from "../../mock/order-items";
import {LocalStorageService} from "../../core/services/storage-service/storage-service.service";
import {Subject} from "rxjs";
import {DishInfo} from "../interfaces/dish-info";

@Component({
  selector: 'app-dish-info',
  templateUrl: './dish-info.component.html',
  styleUrls: ['./dish-info.component.less']
})
export class DishInfoComponent implements OnInit, OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<DishInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {dish: DishInfo},
    private storageService: LocalStorageService
  ) {}

  private notifier = new Subject()

  public image: any

  public count: number = 1

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }

  public setToOrder(dishId: number, count: number) {
    if(this.findOrderedItem(dishId)) {
      ORDERITEMS.forEach(item => {
        if(item.dishId === this.findOrderedItem(dishId)) {
          item.count += count
        }
      })
    } else {
      ORDERITEMS.push({dishId, count})
    }
    this.storageService.setCount(count)
    this.storageService.setOrderItem(dishId, count)
    this.onNoClick()
  }

  public findOrderedItem(dishId: number) {
    let dish = ORDERITEMS.find(item => item.dishId === dishId)

    return dish ? dish.dishId : undefined
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
