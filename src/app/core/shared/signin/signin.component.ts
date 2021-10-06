import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth-service/auth.service";
import {LocalStorageService} from "../../services/storage-service/storage-service.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SigninComponent>,
    private formBuilder: FormBuilder,
    private router : Router,
    private authService : AuthService,
    private storageService : LocalStorageService
  ) {}

  signInForm = new FormGroup({
    username: new FormControl('dwyane'),
    password: new FormControl('wade'),
  });

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public signIn() {
    const loginInfo = this.signInForm.value

    this.authService.register(loginInfo).subscribe(
      (data: any) => {this.storageService.setUser(data.username)},
      error => console.log(error)
    )

    this.onNoClick()
  }
}
