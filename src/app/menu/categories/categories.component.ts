import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from "../../shared/interfaces/category";
import {MenuService} from "../services/menu.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-start-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.less']
})
export class CategoriesComponent implements OnInit, OnDestroy{

  public categoriesInfo : Category[] = []

  private notifier = new Subject()

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
  ) {}

  public get sidebarClass() {
    return this.route.snapshot.paramMap.get('id') ? 'sidebar' : 'start-categories';
  }

  public getCategories() {
    this.menuService.getCategories().pipe(takeUntil(this.notifier))
      .subscribe(category => this.categoriesInfo = category)
  }

  ngOnInit(): void {
    this.getCategories()
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }
}
