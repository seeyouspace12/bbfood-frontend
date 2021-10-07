import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth-service/auth.service";
import {LocalStorageService} from "../../services/storage-service/storage-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private router : Router,
    private authService : AuthService,
    private storageService : LocalStorageService
  ) {}


  loginForm = new FormGroup({
    username: new FormControl('dwyane'),
    password: new FormControl('wade'),
  });

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  public login() {
    const loginInfo = this.loginForm.value
    this.authService.login(loginInfo).subscribe(
      (data: any) => {
        console.log(data)
        this.storageService.setUser(String(data.username))
      },
      error => console.log(error)
    )

    this.onNoClick()
  }
}
