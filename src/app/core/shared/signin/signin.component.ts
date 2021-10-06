import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less']
})
export class SigninComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SigninComponent>,
  ) {}


  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}

