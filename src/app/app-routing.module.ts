import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesComponent} from "./menu/categories/categories.component";
import {CategoriesMenuComponent} from "./menu/menu-container/categories-menu.component";
import {ShoppingCardComponent} from "./menu/shopping-card/shopping-card.component";

const routes: Routes = [
  {path: '', component: CategoriesComponent},
  {path: 'menu/:id', component: CategoriesMenuComponent},
  {path: 'basket', component: ShoppingCardComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
