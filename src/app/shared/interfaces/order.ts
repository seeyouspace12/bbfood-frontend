import {OrderItems} from "./order-item";

export interface Order {
  orderId: number,
  orderItem: OrderItems
}
