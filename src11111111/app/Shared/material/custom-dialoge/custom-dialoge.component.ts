import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-dialoge',
  templateUrl: './custom-dialoge.component.html',
  styleUrls: ['./custom-dialoge.component.scss']
})
export class CustomDialogeComponent implements OnInit {
  sharedvalue:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.sharedvalue = data
  }

  ngOnInit(): void {
  }

}
