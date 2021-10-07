import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LocalStorageService} from "../../core/services/storage-service/storage-service.service";
import {MenuService} from "../../menu/services/menu.service";
import {OrderItems} from "../interfaces/order-item";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.less']
})
export class OrderInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {orderItems : OrderItems[]},
    private menuService: MenuService,
    private storageService : LocalStorageService
  ) {}

  ngOnInit(): void {
  }

  orderInfoForm = new FormGroup({
    address: new FormControl(''),
    date: new FormControl(''),
  });

  public createOrder() {
    const address = this.orderInfoForm.value.address
    const date = this.orderInfoForm.value.date
    const orderItems = this.data.orderItems
    this.menuService.createOrder(date, address, orderItems).subscribe()
    this.storageService.removeOrder()
    this.onNoClick()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
