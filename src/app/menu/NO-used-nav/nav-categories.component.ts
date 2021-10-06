import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MenuService} from "../services/menu.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {Category} from "../../shared/interfaces/category";

@Component({
  selector: 'app-nav-categories',
  templateUrl: './nav-categories.component.html',
  styleUrls: ['./nav-categories.component.less']
})
export class NavCategoriesComponent implements OnInit, OnDestroy {

  public images : Category[] = []

  private notifier = new Subject()

  constructor(
    private router: Router,
    private menuService : MenuService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.menuService.getCategories().pipe(takeUntil(this.notifier))
      .subscribe(images => this.images = images)
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }
}
