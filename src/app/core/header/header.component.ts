import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from "../services/storage-service/storage-service.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.setCountFromStorage()
    this.storageService.watchStorage().pipe(takeUntil(this.notifier)).subscribe(() => {
      this.count = this.storageService.getCount();
    })
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }

  private notifier = new Subject()

  title = 'BIG BABY FOOD'

  count : number = 0

  setCountFromStorage() {
    this.count = Number(localStorage.getItem('count'))
  }
}
