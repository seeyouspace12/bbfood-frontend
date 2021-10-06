import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocalStorageService} from "../../core/services/storage-service/storage-service.service";
import {MenuService} from "../../menu/services/menu.service";
import {OrderItems} from "../interfaces/order-item";

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.less']
})
export class OrderInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {orderItems : OrderItems[]},
    private storageService: LocalStorageService,
    private menuService: MenuService
  ) {}

  public orderItems : OrderItems[] = []

  ngOnInit(): void {
    this.setOrderItems(this.data.orderItems)
  }

  private setOrderItems(orderItems : OrderItems[]): void {
    this.orderItems = orderItems
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
