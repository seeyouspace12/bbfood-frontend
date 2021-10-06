import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocalStorageService} from "../../core/services/storage-service/storage-service.service";
import {MenuService} from "../../menu/services/menu.service";
import {OrderItems} from "../interfaces/order-item";
import {DishInfo} from "../interfaces/dish-info";

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.less']
})
export class OrderInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {dishes : DishInfo[]},
    private storageService: LocalStorageService,
    private menuService: MenuService
  ) {}

  public dishes : DishInfo[] = []

  ngOnInit(): void {
    this.setOrderItems(this.data.dishes)
  }

  private setOrderItems(dishes : DishInfo[]): void {
    this.dishes = dishes
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
