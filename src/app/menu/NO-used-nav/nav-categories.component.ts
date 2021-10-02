import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MenuService} from "../services/menu.service";
import {NavImage} from "../../shared/interfaces/nav-image";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-nav-categories',
  templateUrl: './nav-categories.component.html',
  styleUrls: ['./nav-categories.component.less']
})
export class NavCategoriesComponent implements OnInit, OnDestroy {

  images : NavImage[] = []

  private notifier = new Subject()

  constructor(
    private router: Router,
    private menuService : MenuService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.menuService.getNavImages().pipe(takeUntil(this.notifier))
      .subscribe(images => this.images = images)
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }
}
