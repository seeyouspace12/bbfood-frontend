import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }   from '@angular/common/http';

import {CategoryCatalogComponent} from "./category-catalog/category-catalog.component";
import {NavCategoriesComponent} from "./NO-used-nav/nav-categories.component";
import {CategoriesComponent} from "./categories/categories.component";
import {RouterModule} from '@angular/router';
import {FormsModule} from "@angular/forms";
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import {CategoriesMenuComponent} from "./menu-container/categories-menu.component";
import {CoreModule} from "../core/core.module";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    CategoryCatalogComponent,
    NavCategoriesComponent,
    CategoriesComponent,
    ShoppingCardComponent,
    CategoriesMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CoreModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule
  ],
  exports: [
    CategoryCatalogComponent,
    NavCategoriesComponent,
    CategoriesComponent
  ],
  bootstrap:[CategoriesComponent]
})
export class MenuModule { }
