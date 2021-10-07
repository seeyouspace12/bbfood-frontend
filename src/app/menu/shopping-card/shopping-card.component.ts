import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {OrderItems} from "../../shared/interfaces/order-item";
import {MenuService} from "../services/menu.service";
import {MatDialog} from "@angular/material/dialog";
import {OrderInfoComponent} from "../../shared/order-info/order-info.component";
import {LocalStorageService} from "../../core/services/storage-service/storage-service.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {DishInfo} from "../../shared/interfaces/dish-info";

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.less']
})
export class ShoppingCardComponent implements OnInit, OnChanges, OnDestroy {

  orderItems: OrderItems[] = []
  dataSource: DishInfo[] = []
  total: number = 0

  constructor(
    private menuService: MenuService,
    private storageService: LocalStorageService,
    private dialogRef: MatDialog
  ) {}

  private notifier = new Subject()

  ngOnInit(): void {
    this.setItemsFromStorage()
    this.storageService.watchStorage().pipe(takeUntil(this.notifier)).subscribe(() => {
      this.resetOrderedDishes()
    })
    this.setOrderedDishes()
    this.setTotalPrice()
  }

  ngOnChanges(): void {
    this.resetOrderedDishes()
  }


  setItemsFromStorage() {
    const storageData = this.storageService.getOrderItems()
    if (storageData) {
      this.orderItems = this.storageService.getOrderItems()
    }
  }

  resetOrderedDishes() {
    this.setItemsFromStorage()
    this.setOrderedDishes()
  }

  openDialog() {
    const orderItems = this.orderItems
    console.log(orderItems)
    this.dialogRef.open(OrderInfoComponent, {
      data: {orderItems}
    })
  }

  displayedColumns: string[] = ['img', 'title', 'ingredients', 'price', 'count', 'buttons']

  setOrderedDishes() {
    this.menuService.getDishesInfoById(this.orderItems).pipe(takeUntil(this.notifier)).subscribe((dishInfo : DishInfo[]) => {
      this.dataSource = dishInfo
      this.setTotalPrice()
    })
  }


  getCountByDish(dishId : number) {
    let dish = this.orderItems.find(item => item.itemId === dishId)
    return dish ? dish.count : ''
  }

  ////////////////////////////

  public plusItem(itemId : number) {
    this.storageService.plusOrderItem(itemId)
    this.resetOrderedDishes()
  }

  public removeItem(itemId : number) {
    this.storageService.removeOrderItem(itemId)
    this.resetOrderedDishes()
  }

  public minusItem(itemId : number) {
    this.storageService.minusOrderItem(itemId)
    this.resetOrderedDishes()
  }

  setTotalPrice() {
    let newTotal : number = 0
    this.dataSource.forEach(dish => {
      let price = dish.price
      if (price) {
        newTotal += price * Number(this.getCountByDish(dish.id))
      }
    })
    this.total = newTotal
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }
}
