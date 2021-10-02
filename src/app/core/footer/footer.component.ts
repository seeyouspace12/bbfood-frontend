import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from "../services/storage-service/storage-service.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit, OnDestroy {

  constructor(
    private storageService: LocalStorageService
  ) {}

  private notifier = new Subject()

  ngOnInit(): void {
    this.setCountFromStorage()
    this.setCountFromStorage()
    this.storageService.watchStorage().pipe(takeUntil(this.notifier)).subscribe(() => {
      this.count = this.storageService.getCount();
    })
  }

  count : number = 0

  setCountFromStorage() {
    this.count = Number(localStorage.getItem('count'))
  }

  title = 'BIG BABY FOOD'

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }
}
