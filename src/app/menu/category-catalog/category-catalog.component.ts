import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog} from "@angular/material/dialog";

import { MenuService } from "../services/menu.service";
import { DishInfoComponent } from "../../shared/dish-info/dish-info.component";
import { Category } from "../../shared/interfaces/category";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {DishInfo} from "../../shared/interfaces/dish-info";

@Component({
  selector: 'app-category-catalog',
  templateUrl: './category-catalog.component.html',
  styleUrls: ['./category-catalog.component.less']
})
export class CategoryCatalogComponent implements OnInit, OnDestroy {

  public dishes: DishInfo[] = []
  public category: Category[] = []

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private dialogRef: MatDialog,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  private notifier = new Subject()


  public openDialog(dish : DishInfo) {
    this.dialogRef.open(DishInfoComponent, {
      data: { dish }
    })
  }

  private setFilteredDishes() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.menuService.getDishesInfoByType(id).pipe(takeUntil(this.notifier))
      .subscribe(dishes => {
        this.dishes = dishes
      })
  }

  ngOnInit(): void {
    this.setFilteredDishes()
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
