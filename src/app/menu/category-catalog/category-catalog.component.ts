import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog} from "@angular/material/dialog";

import { MenuService } from "../services/menu.service";
import { ItemsImage } from "../../shared/interfaces/items-image";
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

  images: ItemsImage[] = []
  dishes: DishInfo[] = []
  category: Category[] = []

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private dialogRef: MatDialog,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  private notifier = new Subject()


  openDialog(dish : DishInfo) {
    this.dialogRef.open(DishInfoComponent, {
      data: { dish }
    })
  }

  setImages(): void {
    this.menuService.getImages().pipe(takeUntil(this.notifier))
      .subscribe(images => {
        this.images = images
      })
  }

  getFilteredDishes() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.menuService.getDishesInfoByType(id).pipe(takeUntil(this.notifier))
      .subscribe(dishes => {
        this.dishes = dishes
      })
  }

  ngOnInit(): void {
    this.setImages()
    this.getFilteredDishes()
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
