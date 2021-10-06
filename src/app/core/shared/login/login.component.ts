import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder } from "@angular/forms";
//import { AuthService } from "../../services/auth-service/auth.service";
import { Router } from '@angular/router';
import {User} from "../../../shared/interfaces/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private router : Router,
  ) {}

  username : string = ''
  password : string = ''

  loginForm = this.formBuilder.group({
    username:[''],
    password:[''],
  })

  // login() {
  //   this.authService.login(this.username, this.password)
  // }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
