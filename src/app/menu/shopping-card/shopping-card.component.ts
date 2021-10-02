import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {OrderItems} from "../../shared/interfaces/order-item";
import {DISHES} from "../../mock/dishes";
import {Dish} from "../../shared/interfaces/dish";
import {ORDERS} from "../../mock/orders";
import {MenuService} from "../services/menu.service";
import {ItemsImage} from "../../shared/interfaces/items-image";
import {MatDialog} from "@angular/material/dialog";
import {OrderInfoComponent} from "../../shared/order-info/order-info.component";
import {LocalStorageService} from "../../core/services/storage-service/storage-service.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.less']
})
export class ShoppingCardComponent implements OnInit, OnChanges, OnDestroy {

  orderItems: OrderItems[] = []
  dishesInOrder: Dish[] = []
  dataSource: Dish[] = []
  images: ItemsImage[] = []
  total: number = 0
  allDishes: Dish[] = []

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
    this.setOrderedDishesImages()
    this.setDataSource()
    this.setTotalPrice()
  }

  ngOnChanges(): void {
    this.resetOrderedDishes()
  }


  setItemsFromStorage() {
    this.orderItems = this.storageService.getAllOrderItems()
  }

  resetOrderedDishes() {
    this.setItemsFromStorage()
    this.setOrderedDishes()
    this.setOrderedDishesImages()
    this.setDataSource()
    this.setTotalPrice()
  }

  openDialog(orderItems : OrderItems[]) {
    this.dialogRef.open(OrderInfoComponent, {
      data: { orderItems }
    })
  }

  setDataSource() {
    this.dataSource = this.dishesInOrder
  }

  displayedColumns: string[] = ['img', 'title', 'ingredients', 'price', 'count', 'buttons']

  setOrderedDishes() {
    let dish : any
    this.orderItems.forEach(item => {
      dish = this.getDishById(item.dishId)
      if(dish) {
        this.dishesInOrder.push(dish)
      }
    })
  }

  setAllDishes(): void {
    this.menuService.getAllDishes().pipe(takeUntil(this.notifier)).subscribe(dishes => {
      this.allDishes = dishes
    })
  }

  getDishById(id: number) {
    //return this.allDishes.find(dish => dish.id === id);
    return DISHES.find(dish => dish.id === id);
  }

  getDishPrice(id : number) {
    let dish = this.dishesInOrder.find(dish => dish.id === id)
    return dish ? dish.price : null
  }

  setOrderedDishesImages () {
    this.dishesInOrder.forEach(dish => {
      this.menuService.getImageById(dish.imageId).pipe(takeUntil(this.notifier)).subscribe(image => {
        this.images.push(image)
      })
    })
  }

  getDishImg(imageId : number) {
    let imgUrl
    this.images.forEach( image => {
      if(image.id === imageId) {
        imgUrl = image.url
      }
    })
    return imgUrl
  }

  getCountByDish(dishId : number) {
    let dish = this.orderItems.find(item => item.dishId === dishId)
    return dish ? dish.count : ''
  }

  ////////////////////////////

  //


  setTotalPrice() {
    let newTotal : number = 0
    this.orderItems.forEach(dish => {
      let price = this.getDishPrice(dish.dishId)
      if (price) {
        newTotal += price * dish.count
      }
    })
    this.total = newTotal
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }

  // addOrder() {
  //   let id : number = this.getIndex()
  //   ORDERITEMS.forEach(item => {
  //     ORDERS.push({
  //       orderId : id,
  //       orderItem: item
  //     })
  //   })
  //   console.log(ORDERS)
  // }
  //
  // setOrderedDishes2(): void {
  //   this.orderItems.forEach(dish => {
  //     this.menuService.getDishById(dish.dishId).subscribe(dish => {
  //       this.dishesInOrder.push(dish)
  //       //console.log(this.dishesInOrder)
  //     })
  //   })
  // }
  //
  // setOrderItems() {
  //   this.menuService.getOrderItems().subscribe(items => {
  //     this.orderItems = items
  //   })
  // }
}
