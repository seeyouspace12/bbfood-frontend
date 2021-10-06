import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from "../services/storage-service/storage-service.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../shared/login/login.component";
import {SigninComponent} from "../shared/signin/signin.component";
import {AuthService} from "../services/auth-service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    private storageService: LocalStorageService,
    private authService: AuthService,
    private dialogRef: MatDialog,
  ) {}

  ngOnInit(): void {
    this.setCountFromStorage()
    this.setUsernameFromStorage()
    this.storageService.watchStorage().pipe(takeUntil(this.notifier)).subscribe(() => {
      this.count = this.storageService.getCount();
      this.user = this.storageService.getUser()
    })
  }

  public openDialogLogin() {
    this.dialogRef.open(LoginComponent, {})
  }

  public openDialogSignin() {
    this.dialogRef.open(SigninComponent, {})
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }

  private notifier = new Subject()

  public title = 'BIG BABY FOOD'

  public count : number = 0

  public user : string | null = null

  private setCountFromStorage() {
    this.count = Number(localStorage.getItem('count'))
  }

  private setUsernameFromStorage() {
    const user = localStorage.getItem('user')
    if (user) {
      this.user = user.replace(/"/gi, '')
    }
  }
}
