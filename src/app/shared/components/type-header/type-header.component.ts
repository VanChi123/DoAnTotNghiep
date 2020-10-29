import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-header',
  templateUrl: './type-header.component.html',
  styleUrls: ['./type-header.component.scss']
})
export class TypeHeaderComponent implements OnInit {

  displayType  = false;
  displayOrder = false;
  constructor() { }

  ngOnInit(): void {
  }

  displayTypes(){
    this.displayType = !this.displayType;
  }


  displayOrders(){
    this.displayOrder = !this.displayOrder;
  }

}
