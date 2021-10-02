import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavImage} from "../../shared/interfaces/nav-image";
import {MenuService} from "../services/menu.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start-categories',
  templateUrl: './start-categories.component.html',
  styleUrls: ['./start-categories.component.less']
})
export class StartCategoriesComponent implements OnInit, OnDestroy{

  images: NavImage[] = []
  sidebarClassName : string = 'sidebar'

  private notifier = new Subject()

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
  ) {}

  setSidebarClass() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if (!id) {
      this.sidebarClassName = 'start-categories'
    }
  }

  getNavImages() {
    this.menuService.getNavImages().pipe(takeUntil(this.notifier))
      .subscribe(navImage => this.images = navImage)
  }

  ngOnInit(): void {
    this.getNavImages()
    this.setSidebarClass()
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }
}
