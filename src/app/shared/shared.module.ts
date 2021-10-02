import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DishInfoComponent} from "./dish-info/dish-info.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../core/core.module";
import {OrderInfoComponent} from "./order-info/order-info.component";




@NgModule({
  declarations: [
    DishInfoComponent,
    OrderInfoComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    DishInfoComponent,
    OrderInfoComponent
  ],
})
export class SharedModule { }
